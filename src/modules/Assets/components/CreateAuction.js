import React from 'react';
import {AssetItem, Item} from "./AssetItem";
import {View} from "react-native";
import {Button, InputItem, List} from "@ant-design/react-native";

export class CreateAuction extends React.Component {
  renderDuration = () => {
    return (
      <List>
        <InputItem type="number">
          Duration
        </InputItem>
      </List>
    )
  };

  renderMinPrice = () => {
    return (
      <List>
        <InputItem type="number">
          MinPrice
        </InputItem>
      </List>
    );
  };

  renderDeposit = () => {
    return (
      <List>
        <InputItem type="number">
          Deposit
        </InputItem>
      </List>
    )
  };

  renderAuctionForm = () => {
    return (
      <View style={{
        flex: 1
        }}
      >
        {this.renderDuration()}
        {this.renderMinPrice()}
        {this.renderDeposit()}
      </View>
    )
  };

  renderActionsBlock = () => {
    const {form: {
      deposit,
      minPrice,
      duration
    }} = this.state;

    const disabled = !deposit || !minPrice || !duration;

    return (
      <View style={{
        flexDirection: "row",
        padding: 20,
      }}>
        <Button style={{flex: 1}} type="primary" disabled={disabled}>
          Create auction
        </Button>
      </View>
    );
  };

  render () {
    return (
      <View style={{
        flex: 1
      }}>
        <AssetItem item={this.props.item}/>
        {this.renderAuctionForm()}
        {this.renderActionsBlock()}
      </View>
    )
  }
}