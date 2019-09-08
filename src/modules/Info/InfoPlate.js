import {ActivityIndicator} from '@ant-design/react-native';
import Icon from '@ant-design/react-native/es/icon';
import axios from 'axios';
import React from 'react';
import {
  View,
  Text
} from 'react-native';
import {myAccount, refreshTimeout, server} from '../../../consts';

export class InfoPlate extends React.Component {
  state = {
    balance: {
      available: '...',
    },
    initialLoading: true
  };

  refreshInterval;

  componentWillUnmount(): void {
    this.refreshInterval && clearInterval(this.refreshInterval);
  }

  componentDidMount(): void {
    this.getBalance();

    this.refreshInterval = setInterval(this.getBalance, refreshTimeout);
  }

  getBalance = async () => {
    const res = await axios.get(
      `${server}/${myAccount}/balance`
    );

    this.setState({
      balance: res.data,
      initialLoading: false
    });
  };

  render () {
    const {balance: {available}, initialLoading} = this.state;

    return (
      <Text style={{
        textAlign: "center"
      }}>
        Actual balance:&nbsp;
        {
          typeof available === "number" ?
            available / Math.pow(10, 8) :
            available
        }
      </Text>
    )
    // return (
    //   <View style={{
    //     position: "absolute",
    //     top: 0,
    //     height: 50,
    //   }}>
    //     <Icon name="wallet"/>
    //     {
    //       initialLoading ?
    //         <ActivityIndicator/> :
    //         <Text>
    //           {
    //             typeof available === "number" ?
    //               available / Math.pow(10, 8) :
    //               available
    //           }
    //         </Text>
    //     }
    //   </View>
    // )
  }
}