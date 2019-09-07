import React from 'react';
import {Text, View} from "react-native";
import { SearchBar } from '@ant-design/react-native';
import {server, myAccount} from '../../../consts';
import {AssetList} from "./components/AssetList";
import {AssetItem} from "./components/AssetItem";
import {CreateAuction} from "./components/CreateAuction";
import axios from 'axios';

export class Assets extends React.Component {
  state = {
    assets: [],
    searchValue: undefined,
    appliedSearchValue: undefined,
    selectedItemId: undefined,
    screen: "VIEW",
  };

  componentDidMount(): void {
    this.getAssets();
  }

  getAssets = async () => {
      const res = await axios.get(
        `${server}/${myAccount}/assets`
      );

      this.setState({
        assets: res.data
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

  renderAssetsViewer = () => {
    return (
      <View style={{
        flex: 1
      }}>
        <SearchBar
          value={this.state.searchValue}
          placeholder="Поиск..."
          onSubmit={this.handleSearchSubmit}
          onCancel={this.handleSearchClear}
          onChange={this.handleSearchChange}
        />
        <AssetList
          assets={this.getFilteredAssets()}
          onItemSelect={this.handleItemSelect}
          selectedItemId={this.state.selectedItemId}
          onCreateAuction={this.handleCreateAuction}
        />
      </View>
    );
  };

  renderCreateAuction = () => {
    const {assets, selectedItemId} = this.state;

    return (
      <CreateAuction item={assets.find(asset => asset.id === selectedItemId)}/>
    )
  };

  renderView = () => {
    switch (this.state.screen) {
      case "VIEW":
        return this.renderAssetsViewer();
      case "CREATE_AUCTION":
        return this.renderCreateAuction();
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