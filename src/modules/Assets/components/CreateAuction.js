import axios from 'axios';
import React from 'react';
import {myAccount, server} from '../../../../consts';
import ToastExample from '../../../../ToastExample';
import {AssetItem, Item} from "./AssetItem";
import {View} from "react-native";
import {Button, InputItem, List} from "@ant-design/react-native";

export class CreateAuction extends React.Component {
  state = {
    form: {
      duration: 0,
      minPrice: 0,
      deposit: 0
    }
  };

  handleDurationChange = (duration) => {
    this.setState({
      from: {
        ...this.state.form,
        duration: duration ? Number(duration) : 0
      }
    })
  };

  handleMinPriceChange = (minPrice) => {
    this.setState({
      form: {
        ...this.state.form,
        minPrice: minPrice ? Number(minPrice) : 0
      }
    })
  };

  handleDepositChange = (deposit) => {
    this.setState({
      form: {
        ...this.state.form,
        deposit: deposit ? Number(deposit) : 0
      }
    })
  };

  handleCreateAuction = async () => {
    const {duration, deposit, minPrice} = this.state;

    const res = await axios.post(
      `${server}/auctions`,
      {
        assetId: this.props.item.id,
        duration,
        deposit,
        minPrice
      }
    );

    ToastExample.show(
      res.data.dApp,
      res.data.call.function,
      res.data.call.args,
      res.data.payment,
      // (res, code, error) => this.setState({
      //   status: 'updated' + res + ' ' + code + ' ' + error
      // })
    );
  };

  renderDuration = () => {
    return (
      <List>
        <InputItem type="number" onChange={this.handleDurationChange}  value={this.state.form.duration}>
          Duration
        </InputItem>
      </List>
    )
  };

  renderMinPrice = () => {
    return (
      <List>
        <InputItem type="number" onChange={this.handleMinPriceChange} value={this.state.form.minPrice}>
          MinPrice
        </InputItem>
      </List>
    );
  };

  renderDeposit = () => {
    return (
      <List>
        <InputItem type="number" onChange={this.handleDepositChange} value={this.state.form.deposit}>
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
    // const {form: {
    //   deposit,
    //   minPrice,
    //   duration
    // }} = this.state;

    const disabled = false; // Boolean(!deposit || !minPrice || !duration);

    return (
      <View style={{
        flexDirection: "row",
        padding: 20,
      }}>
        <Button style={{flex: 1}} type="primary" disabled={disabled} onPress={this.handleCreateAuction}>
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