import {SearchBar} from '@ant-design/react-native';
import Toast from '@ant-design/react-native/lib/toast';
import axios from 'axios';
import React from 'react';
import {Text, View} from "react-native";
import {myAccount, refreshTimeout, server} from '../../../consts';
import ToastExample from '../../../ToastExample';
import {AuctionList} from './components/AuctionList';
import RNSecureStorage from 'rn-secure-storage'

export class Trade extends React.Component {
  state = {
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
      `${server}/auctions`
    );

    this.setState({
      auctions: res.data
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

  handleBidResponse = (res, code, error) => {
    if (res === "success") {
      Toast.success('Bid created', 2);
    } else {
      Toast.fail(res + ' ' + code + ' ' + error, 2);
    }
  };

  handleBid = async (auctionId, amount) => {
    console.log('debug bid');
    try {
      const hashRes = await axios.post(
        `${server}/hash`,
        {
          amount: amount
        }
      );
      const hash = hashRes.data.hashedAmount;

      console.log('debug hash ' + hash);

      const storageKey = `${myAccount}:${auctionId}`;
      await RNSecureStorage.set(storageKey, JSON.stringify(hashRes.data), {
        accessible: "AccessibleWhenUnlocked"
      });

      console.log('debug set item');

      const auction = this.state.auctions.find(item => item.id === auctionId);

      const res = await axios.post(
        `${server}/auctions/${auctionId}/bid`,
        {
          hash: hash,
          deposit: auction.deposit / Math.pow(10, 8)
        }
      );

      console.log('debug send', JSON.stringify(res.data));

      ToastExample.show(
        res.data.data.dApp,
        res.data.data.call.function,
        res.data.data.call.args,
        res.data.data.payment,
        this.handleBidResponse
      );
    } catch (e) {
      console.log('debug error ' + e.message);
    }
  };

  render () {
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
        <AuctionList auctions={this.getFilteredAuctions()} selectedItemId={this.state.selectedItemId}
                     onItemSelect={this.handleItemSelect}
          onBid={this.handleBid}
        />
      </View>
    )
  }
}