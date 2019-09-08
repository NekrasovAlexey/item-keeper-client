import Toast from '@ant-design/react-native/lib/toast';
import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Button, Icon, InputItem, List} from '@ant-design/react-native';
import {emptyImage} from '../../../../consts';

export class AuctionItem extends React.Component {
  state = {
    bidAmount: '',
    bidInProcess: false
  };

  getTimeLeft = () => {
    // const {height, item: {
    //   closing_start
    // }} = this.props;
    //
    // if (!height) {
    //   return '...';
    // }
    //
    // const timeLeft = closing_start - height;
    // return timeLeft < 0 ? "expired" : `${timeLeft} min`;
    const {
      item: {
        deltaReveal
      }
    } = this.props;

    return deltaReveal > 0 ? `${deltaReveal} min` : "expired";
  };

  handleBidChange = (amount) => {
    this.setState({
      bidAmount: amount ? amount : '',
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
      startPrice,
      deposit,
      unrevealed_count,
      orgTag
    }} = this.props;

    return (
      <View style={{
        marginLeft: 20,
        flex: 1,
        justifyContent: "center"
      }}>
        <Text style={{fontSize: 18}}>{name}{orgTag ? `&nbsp;-&nbsp;${orgTag}` : ''}</Text>
        <Text>{`Time left: ${this.getTimeLeft()}`}</Text>
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
          <Text style={{width: 100}}>Bid amount:</Text>
        </InputItem>
      </List>
    );
  };

  renderBidForm = () => {
    return (
      <View style={{
        flex: 1,
        paddingTop: 20
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
    const {bidAmount, bidInProcess} = this.state;

    const disabled = !bidAmount || Number(bidAmount) > (deposit / Math.pow(10, 8)) || bidInProcess;

    return (
      <View style={{
        flexDirection: "row",
        paddingTop: 20
      }}>
        <Button
          loading={bidInProcess}
          style={{flex: 1}}
          disabled={disabled}
          onPress={this.handleBid}
          type="primary"
        >
          Bid
        </Button>
      </View>
    )
  };

  render () {
    const {selected, item: {orgTag}} = this.props;

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
        {selected && orgTag !== "org" && this.renderBidForm()}
        {selected && orgTag !== "org" && this.renderActionsBlock()}
      </View>
    );
  }
}