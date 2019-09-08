import {ActivityIndicator, SearchBar} from '@ant-design/react-native';
import Toast from '@ant-design/react-native/lib/toast';
import axios from 'axios';
import React from 'react';
import {Text, View} from "react-native";
import {myAccount, refreshTimeout, server} from '../../../consts';
import ToastExample from '../../../ToastExample';
import {AuctionList} from './components/AuctionList';
import RNSecureStorage from 'rn-secure-storage'

export class MyBids extends React.Component {
  state = {
    initialLoading: true,
    auctions: [],
    searchValue: undefined,
    appliedSearchValue: undefined,
    selectedItemId: undefined,
  };

  refreshInterval;

  componentWillUnmount(): void {
    this.refreshInterval && clearInterval(this.refreshInterval);
  }

  componentDidMount(): void {
    this.getAuctions();

    this.refreshInterval = setInterval(this.getAuctions, refreshTimeout);
  }

  getAuctions = async () => {
    const res = await axios.get(
      `${server}/${myAccount}/auctions/bidder`
    );

    this.setState({
      auctions: res.data,
      initialLoading: false
    });
  };

  getFilteredAuctions = () => {
    const {appliedSearchValue, auctions} = this.state;

    return appliedSearchValue ? auctions.filter(auction => {
      return auction.lot.name.includes(appliedSearchValue);
    }) : auctions;
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

  render () {
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
        <AuctionList auctions={this.getFilteredAuctions()} selectedItemId={this.state.selectedItemId}
                     onItemSelect={this.handleItemSelect}
        />}
      </View>
    )
  }
}