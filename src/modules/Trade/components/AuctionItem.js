import Toast from '@ant-design/react-native/lib/toast';
import React from 'react';
import {Image, View, Text} from "react-native";
import {Button, InputItem, List} from '@ant-design/react-native';

export class AuctionItem extends React.Component {
  state = {
    bidAmount: '0',
    bidInProcess: false
  };

  getTimeLeft = () => {
    const {height, item: {
      closing_start
    }} = this.props;

    return height ? `${closing_start - height} min` : '...'
  };

  handleBidChange = (amount) => {
    this.setState({
      bidAmount: amount ? amount : '0',
    });
  };

  handleBid = async () => {
    this.setState({
      bidInProcess: true
    });

    try {
      await this.props.onBid(
        this.props.item.id,
        Number(this.state.bidAmount)
      );

      this.setState({
        bidInProcess: false
      });
    } catch (e) {
      this.setState({
        bidInProcess: false
      });
    }
  };

  renderImage = () => {
    const {item: {
      lot: {
        description
      },
    }} = this.props;

    return (
      <Image source={{uri: description}} style={{ width: 100, height: 100 }}/>
    );
  };

  renderInfo = () => {
    const {item: {
      lot: {
        name
      },
      startPrice,
      deposit,
      unrevealed_count
    }} = this.props;

    return (
      <View style={{
        marginLeft: 20,
        flex: 1,
      }}>
        <Text style={{fontSize: 20}}>{name}</Text>
        <Text>{`Time left for bids: ${this.getTimeLeft()}`}</Text>
        <Text>{`Start bid: ${startPrice / Math.pow(10, 8)}`}</Text>
        <Text>{`Max bid: ${deposit / Math.pow(10, 8)}`}</Text>
        <Text>{`Bids: ${unrevealed_count}`}</Text>
      </View>
    )
  };

  renderBidAmount = () => {
    return (
      <List>
        <InputItem type="number" onChange={this.handleBidChange}  value={this.state.bidAmount}>
          Bid amount
        </InputItem>
      </List>
    );
  };

  renderBidForm = () => {
    return (
      <View style={{
        flex: 1
      }}
      >
        {this.renderBidAmount()}
      </View>
    )
  };

  renderActionsBlock = () => {
    const {item: {
      deposit
    }} = this.props;
    const {bidAmount} = this.state;

    const disabled = !bidAmount || Number(bidAmount) > (deposit / Math.pow(10, 8));

    return (
      <View style={{
        flexDirection: "row"
      }}>
        <Button
          loading={this.state.bidInProcess}
          style={{flex: 1}} disabled={disabled} onPress={this.handleBid} type="primary">
          Bid
        </Button>
      </View>
    )
  };

  render () {
    const {selected} = this.props;

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
        {selected && this.renderBidForm()}
        {selected && this.renderActionsBlock()}
      </View>
    );
  }
}