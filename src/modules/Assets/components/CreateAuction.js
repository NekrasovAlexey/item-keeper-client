import Toast from '@ant-design/react-native/lib/toast';
import axios from 'axios';
import React from 'react';
import {myAccount, server} from '../../../../consts';
import ToastExample from '../../../../ToastExample';
import {AssetItem, Item} from "./AssetItem";
import {Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon, InputItem, List} from '@ant-design/react-native';

export class CreateAuction extends React.Component {
  state = {
    form: {
      duration: 0,
      startPrice: 0,
      deposit: 0
    },
    createAuctionInProcess: false
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
    this.setState({
      createAuctionInProcess: true
    });

    try {
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

      this.setState({
        createAuctionInProcess: false
      });
    } catch (e) {
      this.setState({
        createAuctionInProcess: false
      });
    }
  };


  renderBackBlock = () => {
    return (
      <TouchableOpacity
        onPress={() => this.props.onClose()}
        style={{
          flexDirection: "row",
          height: 40,
          paddingLeft: 10,
          alignItems: "center"
        }}
      >
        <Icon name="caret-left"/><Text>Back</Text>
      </TouchableOpacity>
    )
  };

  renderDuration = () => {
    return (
      <List>
        <InputItem type="number" onChange={this.handleDurationChange}  value={this.state.form.duration}
           // maxLength={3}
        >
          <Text style={{width: 100}}>Duration:</Text>
        </InputItem>
      </List>
    )
  };

  renderStartPrice = () => {
    return (
      <List>
        <InputItem type="number" onChange={this.handleStartPriceChange} value={this.state.form.startPrice}
           // maxLength={3}
        >
          <Text style={{width: 100}}>Start price:</Text>
        </InputItem>
      </List>
    );
  };

  renderDeposit = () => {
    return (
      <List>
        <InputItem type="number" onChange={this.handleDepositChange} value={this.state.form.deposit}
                   // maxLength={3}
        >
          <Text style={{width: 100}}>Deposit:</Text>
        </InputItem>
      </List>
    )
  };

  renderAuctionForm = () => {
    return (
      <View>
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
    }, createAuctionInProcess} = this.state;

    const disabled = Boolean(!deposit || !startPrice || !duration || startPrice > deposit || createAuctionInProcess);

    return (
      <View style={{
        flexDirection: "row",
        padding: 20,
      }}>
        <Button
          style={{flex: 1}} type="primary"
          disabled={disabled}
          onPress={this.handleCreateAuction}
          loading={createAuctionInProcess}
        >
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
        {this.renderBackBlock()}
        <AssetItem item={this.props.item}/>
        {this.renderAuctionForm()}
        {this.renderActionsBlock()}
      </View>
    )
  }
}