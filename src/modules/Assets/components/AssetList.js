import React from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Item, AssetItem} from "./AssetItem";

export class AssetList extends React.Component {
  handleItemSelectFactory = (id) => () => {
    this.props.onItemSelect(id);
  };

  renderEmpty = () => {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Text>Nothing here</Text>
      </View>
    );
  };

  renderList = () => {
    return this.props.assets.map(item => (
      <TouchableOpacity
        key={item.id}
        onPress={this.handleItemSelectFactory(item.id)}
      >
        <AssetItem item={item} selected={this.props.selectedItemId === item.id} onCreateAuction={this.props.onCreateAuction} onTransfer={this.props.onTransfer}/>
      </TouchableOpacity>
    ));
  };

  render () {
    return this.props.assets.length ?
      <ScrollView style={{
        flex: 1
      }}>
        {this.renderList()}
      </ScrollView> :
      this.renderEmpty();
  }
}
