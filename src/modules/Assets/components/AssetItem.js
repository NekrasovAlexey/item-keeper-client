import React from 'react';
import {Image, View, Text} from "react-native";
import { Button } from '@ant-design/react-native';

export class AssetItem extends React.Component {
  renderImage = () => {
    const {item: {
      description,
    }} = this.props;

    return (
      <Image source={{uri: description}} style={{ width: 100, height: 100 }}/>
    );
  };

  renderInfo = () => {
    const {item: {
      name,
    }} = this.props;

    return (
      <View style={{
        marginLeft: 20,
        flex: 1,
      }}>
        <Text style={{fontSize: 20}}>{name}</Text>
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