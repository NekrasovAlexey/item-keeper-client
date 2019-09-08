import React from 'react';
import {Image, View, Text} from "react-native";
import { Button } from '@ant-design/react-native';
import {emptyImage} from '../../../../consts';

export class AssetItem extends React.Component {
  renderImage = () => {
    const {item: {
      description,
    }} = this.props;

    return (
      <Image source={{uri: description || emptyImage}} style={{ width: 100, height: 100 }}/>
    );
  };

  renderInfo = () => {
    const {item: {
      name,
      id
    }} = this.props;

    return (
      <View style={{
        marginLeft: 20,
        flex: 1,
        justifyContent: "center"
      }}>
        <Text style={{fontSize: 18}}>{name}</Text>
        <Text>{id}</Text>
      </View>
    )
  };

  renderActionsBlock = () => {
    return (
      <View style={{
        paddingTop: 20
      }}>
        <Button style={{flex: 1}} type="primary" onPress={this.props.onCreateAuction}>
          Create auction
        </Button>
        <Button style={{flex: 1, marginTop: 10}}>
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
      <View style={{paddingTop: 20}}>
        <Text>Отправитель: {sender}</Text>
      </View>
    )
  };

  render () {
    const {selected} = this.props;

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
        {selected && this.renderFullInfo()}
        {selected && this.renderActionsBlock()}
      </View>
    );
  }
}