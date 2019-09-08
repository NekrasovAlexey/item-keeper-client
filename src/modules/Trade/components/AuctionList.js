import axios from 'axios';
import React from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {myAccount, server} from '../../../../consts';
import {AuctionItem} from './AuctionItem';

export class AuctionList extends React.Component {
  state = {
    height: 0
  };

  heightInterval;

  componentDidMount(): void {
    this.getHeight();
  }

  componentWillUnmount(): void {
    this.heightInterval && clearInterval(this.heightInterval);
  }

  getHeight = async () => {
    const res = await axios.get(
      `${server}/height`
    );

    this.setState({
      height: res.data.height
    }, () => {
      this.heightInterval = setInterval(() => {
        const {height} = this.state;

        height && this.setState({
          height: height + 1
        });
      }, 60000);
    });
  };

  handleItemSelectFactory = (id) => () => {
    this.props.onItemSelect(id);
  };

  renderEmpty = () => {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Text>Пока ничего нет</Text>
      </View>
    );
  };

  renderList = () => {
    return this.props.auctions.map(item => (
      <TouchableOpacity
        key={item.id}
        onPress={this.handleItemSelectFactory(item.id)}
      >
        <AuctionItem item={item} selected={this.props.selectedItemId === item.id} height={this.state.height}
          onBid={this.props.onBid}
        />
      </TouchableOpacity>
    ));
  };

  render () {
    return (
      <ScrollView style={{
        flex: 1
      }}>
        {
          this.props.auctions.length ? this.renderList() : this.renderEmpty()
        }
      </ScrollView>
    );
  }
}
