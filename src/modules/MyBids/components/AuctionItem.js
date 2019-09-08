import Toast from '@ant-design/react-native/lib/toast';
import React from 'react';
import {Image, View, Text} from "react-native";
import {Button, InputItem, List} from '@ant-design/react-native';
import RNSecureStorage from "rn-secure-storage";
import {emptyImage, myAccount} from '../../../../consts';

export class AuctionItem extends React.Component {
  state = {
    myBid: '...'
  };

  componentDidMount(): void {
    this.getMyBid()
  }

  getMyBid = async () => {
    const storageKey = `${myAccount}:${this.props.item.id}`;
    const myBid = await RNSecureStorage.get(storageKey);

    this.setState({
      myBid: JSON.parse(myBid).amount / Math.pow(10, 8)
    });
  };

  getTimeLeft = () => {
    const {height, item: {
      closing_start
    }} = this.props;

    return height ? `${closing_start - height} min` : '...'
  };

  handleReveal = () => {
    this.props.onReveal(this.props.item.id);
  };

  renderImage = () => {
    const {item: {
      lot: {
        description
      },
    }} = this.props;

    return (
      <Image source={{uri: description || emptyImage}} style={{ width: 100, height: 100 }}/>
    );
  };

  renderInfo = () => {
    const {item: {
      lot: {
        name
      },
      unrevealed_count
    }} = this.props;

    return (
      <View style={{
        marginLeft: 20,
        flex: 1,
        justifyContent: "center"
      }}>
        <Text style={{fontSize: 18}}>{name}</Text>
        <Text>{`Time left for bids: ${this.getTimeLeft()}`}</Text>
        <Text>{`My bid: ${this.state.myBid}`}</Text>
        <Text>{`Bids: ${unrevealed_count}`}</Text>
      </View>
    )
  };

  renderActionsBlock = () => {
    return (
      <View style={{
        flexDirection: "row"
      }}>
        <Button
          loading={this.state.bidInProcess}
          style={{flex: 1}} onPress={this.handleReveal} type="primary">
          Reveal
        </Button>
      </View>
    )
  };

  render () {
    const {selected, item: {
      phase
    }} = this.props;

    return (
      <View style={{
        padding: 20,
      }}>
        <View style={{
          flexDirection: "row"
        }}>
          {this.renderImage()}
          {this.renderInfo()}
        </View>
        {selected && phase === "REVEAL" && this.renderActionsBlock()}
      </View>
    );
  }
}