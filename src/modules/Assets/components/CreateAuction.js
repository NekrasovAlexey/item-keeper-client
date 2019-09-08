import Toast from '@ant-design/react-native/lib/toast';
import axios from 'axios';
import React from 'react';
import {myAccount, server} from '../../../../consts';
import ToastExample from '../../../../ToastExample';
import {AssetItem, Item} from "./AssetItem";
import {Text, View} from 'react-native';
import {Button, InputItem, List} from "@ant-design/react-native";

export class CreateAuction extends React.Component {
  state = {
    form: {
      duration: 0,
      startPrice: 0,
      deposit: 0
    }
  };

  handleDurationChange = (duration) => {
    this.setState({
      form: {
        ...this.state.form,
        duration: duration ? Number(duration) : 0
      }
    })
  };

  handleStartPriceChange = (startPrice) => {
    this.setState({
      form: {
        ...this.state.form,
        startPrice: startPrice ? Number(startPrice) : 0
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

  handleCreateAuctionResponse = (res, code, error) => {
    if (res === "success") {
      Toast.success('Auction created', 2);
      this.props.onClose(true);
    } else {
      Toast.fail(res + ' ' + code + ' ' + error, 2);
    }
  };

  handleCreateAuction = async () => {
    const {form: {duration, deposit, startPrice}} = this.state;

    const res = await axios.post(
      `${server}/auctions`,
      {
        assetId: this.props.item.id,
        duration: Number(duration),
        deposit: Number(deposit),
        startPrice: Number(startPrice)
      }
    );

    ToastExample.show(
      res.data.data.dApp,
      res.data.data.call.function,
      res.data.data.call.args,
      res.data.data.payment,
      this.handleCreateAuctionResponse
    );
  };

  renderDuration = () => {
    return (
      <List>
        <InputItem type="number" onChange={this.handleDurationChange}  value={this.state.form.duration}>
          <Text style={{width: 100}}>Duration:</Text>
        </InputItem>
      </List>
    )
  };

  renderStartPrice = () => {
    return (
      <List>
        <InputItem type="number" onChange={this.handleStartPriceChange} value={this.state.form.startPrice}>
          <Text style={{width: 100}}>Start price:</Text>
        </InputItem>
      </List>
    );
  };

  renderDeposit = () => {
    return (
      <List>
        <InputItem type="number" onChange={this.handleDepositChange} value={this.state.form.deposit}>
          <Text style={{width: 100}}>Deposit:</Text>
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
        {this.renderStartPrice()}
        {this.renderDeposit()}
      </View>
    )
  };

  renderActionsBlock = () => {
    const {form: {
      deposit,
      startPrice,
      duration
    }} = this.state;

    const disabled = Boolean(!deposit || !startPrice || !duration || startPrice > deposit);

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