import Toast from '@ant-design/react-native/lib/toast';
import axios from 'axios';
import React from 'react';
import {Image, View, Text} from "react-native";
import {Button, InputItem, List} from '@ant-design/react-native';
import RNSecureStorage from "rn-secure-storage";
import {emptyImage, myAccount, server} from '../../../../consts';
import ToastExample from '../../../../ToastExample';

export class AuctionItem extends React.Component {
  state = {
    myBid: '...',
    process: false
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
    const {
      item: {
        deltaReveal
      }
    } = this.props;

    return deltaReveal > 0 ? `${deltaReveal} min` : "expired";
  };

  handleRevealResponse = (res, code, error) => {
    if (res === "success") {
      Toast.success('Success reveal', 2);
    } else {
      Toast.fail(res + ' ' + code + ' ' + error, 2);
    }
  };

  handleReveal = async () => {
    this.setState({
      process: true
    });

    try {
      const {
        item: {
          id
        }
      } = this.props;

      const storageKey = `${myAccount}:${this.props.item.id}`;
      const bidData = await RNSecureStorage.get(storageKey);
      const {salt, amount} = JSON.parse(bidData);

      const res = await axios.post(
        `${server}/auctions/${id}/reveal`,
        {
          salt: salt,
          amount: amount / Math.pow(10, 8)
        }
      );

      ToastExample.invoke(
        res.data.data.dApp,
        res.data.data.call.function,
        res.data.data.call.args,
        res.data.data.payment,
        this.handleRevealResponse
      );

      this.setState({
        process: false
      });
    } catch (e) {
      this.setState({
        process: false
      });

      Toast.fail(e.message, 2);
    }
  };

  handleWithdrawResponse = (res, code, error) => {
    if (res === "success") {
      Toast.success('Success withdraw', 2);
    } else {
      Toast.fail(res + ' ' + code + ' ' + error, 2);
    }
  };

  handleWithdraw = async () => {
    this.setState({
      process: true
    });

    try {
      const {item: {
        id
      }} = this.props;

      const res = await axios.post(
        `${server}/auctions/${id}/withdraw`
      );

      ToastExample.invoke(
        res.data.data.dApp,
        res.data.data.call.function,
        res.data.data.call.args,
        res.data.data.payment,
        this.handleWithdrawResponse
      );

      this.setState({
        process: false
      });
    } catch (e) {
      this.setState({
        process: false
      });

      Toast.fail(e.message, 2);
    }
  };

  renderImage = () => {
    const {item: {
      lot: {
        description
      },
    }} = this.props;

    return (
      <Image source={{uri: description || emptyImage}} style={{
        alignSelf: 'center',
        height: 100,
        width: 150,
      }}
             resizeMode="contain"
      />
    );
  };

  renderInfo = () => {
    const {item: {
      lot: {
        name
      },
      unrevealed_count,
      phase
    }} = this.props;

    return (
      <View style={{
        marginLeft: 20,
        flex: 1,
        justifyContent: "center"
      }}>
        <Text style={{fontSize: 18}}>{name}</Text>
        <Text>{`Time left: ${this.getTimeLeft()}`}</Text>
        <Text>{`My bid: ${this.state.myBid}`}</Text>
        <Text>{`Bids: ${unrevealed_count}`}</Text>
        <Text>{`Phase: ${phase}`}</Text>
      </View>
    )
  };

  renderActionsBlock = () => {
    const {item: {
      phase
    }} = this.props;
    const {process} = this.state;

    return (
      <View style={{
        flexDirection: "row",
        paddingTop: 20
      }}>
        {phase === "REVEAL" && <Button
          style={{flex: 1}}
          onPress={this.handleReveal}
          type="primary"
          loading={process}
          disabled={process}
        >
          Reveal
        </Button>}
        {phase === "SETTLE" && <Button
          style={{flex: 1}}
          onPress={this.handleWithdraw}
          type="primary"
          loading={process}
          disabled={process}
        >
          Withdraw
        </Button>}
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
        backgroundColor: selected ? "#efefef" : "#fff"
      }}>
        <View style={{
          flexDirection: "row"
        }}>
          {this.renderImage()}
          {this.renderInfo()}
        </View>
        {selected && phase !== "BID" && this.renderActionsBlock()}
      </View>
    );
  }
}