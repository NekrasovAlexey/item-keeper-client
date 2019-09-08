import React from 'react';
import {Text, View} from "react-native";
import {ActivityIndicator, SearchBar} from '@ant-design/react-native';
import {server, myAccount, refreshTimeout} from '../../../consts';
import {AssetList} from "./components/AssetList";
import {AssetItem} from "./components/AssetItem";
import {CreateAuction} from "./components/CreateAuction";
import axios from 'axios';
import {Transfer} from './components/Transfer';

export class Assets extends React.Component {
  state = {
    initialLoading: true,
    assets: [],
    searchValue: undefined,
    appliedSearchValue: undefined,
    selectedItemId: undefined,
    screen: "VIEW",
  };

  refreshInterval;

  componentWillUnmount(): void {
    this.refreshInterval && clearInterval(this.refreshInterval);
  }

  componentDidMount(): void {
    this.getAssets();

    this.refreshInterval = setInterval(this.getAssets, refreshTimeout);
  }

  getAssets = async () => {
      const res = await axios.get(
        `${server}/${myAccount}/assets`
      );

      this.setState({
        assets: res.data,
        initialLoading: false
      });
  };

  getFilteredAssets = () => {
    const {appliedSearchValue, assets} = this.state;

    return appliedSearchValue ? assets.filter(asset => {
      return asset.name.includes(appliedSearchValue);
    }) : assets;
  };

  handleSearchSubmit = (value) => {
    this.setState({
      appliedSearchValue: value
    });
  };

  handleSearchChange = (value) => {
    this.setState({
      searchValue: value
    });
  };

  handleSearchClear = () => {
    this.setState({
      searchValue: undefined
    });
  };

  handleItemSelect = (id) => {
    this.setState({
      selectedItemId: this.state.selectedItemId === id ? undefined : id
    });
  };

  handleCreateAuction = () => {
    this.setState({
      screen: "CREATE_AUCTION"
    });
  };

  handleTransfer = () => {
    this.setState({
      screen: "TRANSFER"
    });
  };

  handleCloseAuction = (success) => {
    this.setState({
      selectedItemId: undefined,
      screen: "VIEW"
    }, () => {
      success && this.getAssets()
    })
  };

  renderAssetsViewer = () => {
    return (
      <View style={{
        flex: 1
      }}>
        <SearchBar
          value={this.state.searchValue}
          placeholder="Search..."
          onSubmit={this.handleSearchSubmit}
          onCancel={this.handleSearchClear}
          onChange={this.handleSearchChange}
        />
        {this.state.initialLoading ?
          <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}>
            <ActivityIndicator size="large" />
          </View> :
        <AssetList
          assets={this.getFilteredAssets()}
          onItemSelect={this.handleItemSelect}
          selectedItemId={this.state.selectedItemId}
          onCreateAuction={this.handleCreateAuction}
          onTransfer={this.handleTransfer}
        />}
      </View>
    );
  };

  renderCreateAuction = () => {
    const {assets, selectedItemId} = this.state;

    return (
      <CreateAuction
        item={assets.find(asset => asset.id === selectedItemId)}
        onClose={this.handleCloseAuction}
      />
    )
  };

  renderTransfer = () => {
    const {selectedItemId} = this.state;

    return (
      <Transfer
        assetId={selectedItemId}
        onClose={this.handleCloseAuction}
      />
    )
  };

  renderView = () => {
    switch (this.state.screen) {
      case "VIEW":
        return this.renderAssetsViewer();
      case "CREATE_AUCTION":
        return this.renderCreateAuction();
      case "TRANSFER":
        return this.renderTransfer();
    }
  };

  render () {
    return (
      <View style={{
        flex: 1
      }}>
        {this.renderView()}
      </View>
    )
  }
}