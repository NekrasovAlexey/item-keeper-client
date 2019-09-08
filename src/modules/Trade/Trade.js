import {SearchBar} from '@ant-design/react-native';
import axios from 'axios';
import React from 'react';
import {Text, View} from "react-native";
import {myAccount, server} from '../../../consts';
import {AuctionList} from './components/AuctionList';

export class Trade extends React.Component {
  state = {
    auctions: [],
    searchValue: undefined,
    appliedSearchValue: undefined,
    selectedItemId: undefined,
  };

  componentDidMount(): void {
    this.getAuctions();
  }

  getAuctions = async () => {
    const res = await axios.get(
      `${server}/${myAccount}/auctions/organizer`
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

  handleBid = (id) => {
    
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