import React from 'react';
import {Image, View, Text} from "react-native";
import { Button } from '@ant-design/react-native';

export class AuctionItem extends React.Component {
  getTimeLeft = () => {
    const {height, item: {
      closing_start
    }} = this.props;

    return height ? `${closing_start - height} min` : '...'
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

  renderActionsBlock = () => {
    return (
      <View style={{
        flexDirection: "row"
      }}>
        <Button style={{flex: 1}} onPress={this.props.onCreateAuction}>
          Create auction
        </Button>
        <Button style={{flex: 1}}>
          Transfer
        </Button>
      </View>
    )
  };

  renderFullInfo = () => {
    const {item: {
      sender
    }} = this.props;

    return (
      <View>
        <Text>Отправитель: {sender}</Text>
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
        {selected && this.renderActionsBlock()}
        {selected && this.renderFullInfo()}
      </View>
    );
  }
}