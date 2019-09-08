import React from 'react';
import {Image, View, Text} from "react-native";
import {Button, InputItem, List} from '@ant-design/react-native';

export class AuctionItem extends React.Component {
  state = {
    bidAmount: 0
  };

  getTimeLeft = () => {
    const {height, item: {
      closing_start
    }} = this.props;

    return height ? `${closing_start - height} min` : '...'
  };

  handleBidChange = (amount) => {
    this.setState({
      bidAmount: amount ? Number(amount) : 0
    });
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
      top_price,
      unrevealed_count
    }} = this.props;

    return (
      <View style={{
        marginLeft: 20,
        flex: 1,
      }}>
        <Text style={{fontSize: 20}}>{name}</Text>
        <Text>{`Time left for bids: ${this.getTimeLeft()}`}</Text>
        <Text>{`Start bid: ${startPrice}`}</Text>
        <Text>{`Max bid: ${top_price}`}</Text>
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
    const disabled = !this.state.bidAmount;

    return (
      <View style={{
        flexDirection: "row"
      }}>
        <Button style={{flex: 1}} disabled={disabled} onPress={this.props.onBid} type="primary">
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