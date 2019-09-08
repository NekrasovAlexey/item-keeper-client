import {ActivityIndicator, Icon} from '@ant-design/react-native';
import Toast from '@ant-design/react-native/lib/toast';
import axios from 'axios';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {server} from '../../../../consts';
import ToastExample from '../../../../ToastExample';

export class Transfer extends React.Component {
  state = {
    recipient: undefined,
    process: false
  };

  handleTransferResponse = (res, code, error) => {
    if (res === "success") {
      Toast.success('Transfer success', 2);
      this.props.onClose(true);
    } else {
      Toast.fail(res + ' ' + code + ' ' + error, 2);
    }
  };

  handleTransfer = async () => {
    console.log('debug transfer');
    this.setState({
      process: true
    });

    const {onClose, assetId} = this.props;

    try {
      const {recipient} = this.state;

      console.log('debug transfer fetch', assetId, recipient);

      const res = await axios.post(
        `${server}/transfers`,
        {
          assetId,
          recipient
        }
      );

      ToastExample.transfer(
        res.data.data.recipient,
        res.data.data.amount.assetId,
        this.handleTransferResponse
      );

      this.setState({
        process: false
      }, () => {
        console.log('debug close suc');
        onClose(true);
      });
    } catch (e) {
      this.setState({
        process: false
      }, () => {
        console.log('debug close err', e.message);
        onClose();
      });
    }
  };

  handleScan = (e) => {
    console.log('debug scan', e.data);

    this.setState({
      recipient: e.data
    }, this.handleTransfer);
  };

  renderTransfer = () => {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <ActivityIndicator size="large" />
      </View>
    )
  };

  renderScanner = () => {
    return (
      <QRCodeScanner
        onRead={this.handleScan}
      />
    );
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

  renderContent = () => {
    return this.state.recipient ?
      this.renderTransfer() :
      this.renderScanner();
  };

  render() {
    return (
      <View>
        {this.renderBackBlock()}
        {this.renderContent()}
      </View>
    );
  }
}