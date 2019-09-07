import React from 'react';
import {Text, View} from "react-native";
import { SearchBar } from '@ant-design/react-native';
import {AssetList} from "./components/AssetList";
import {AssetItem} from "./components/AssetItem";
import {CreateAuction} from "./components/CreateAuction";

const assets = [
  {
    "senderPublicKey": "9VT4pX9RMWWBjUos6rg3HXL8cN7SAZPDCUSZa3mCvs4t",
    "quantity": 1,
    "fee": 100000,
    "description": "https://docs.wavesplatform.com/_theme/brand-logo/waves-docs-logo.png",
    "type": 3,
    "version": 2,
    "reissuable": false,
    "script": null,
    "sender": "3N7vkrDS5SshppzygYW9X7khMBmAKRt8yu1",
    "feeAssetId": null,
    "chainId": 84,
    "proofs": [
      "5CE4Fod5dgi23a6yTPiswEZ3bnZccJ7Sc9HgiwFPNgvSnY8DgCSamjR4Ry4kdBq8Nxug37SDGSJErjquGgZAU7Rs"
    ],
    "assetId": "977P4wMdZpUdGFoH4crJZMVtgi3Men6WaLBe5TqV1sHo",
    "decimals": 0,
    "name": "trololo 1001",
    "id": "977P4wMdZpUdGFoH4crJZMVtgi3Men6WaLBe5TqV1sHo",
    "timestamp": 1566839371266
  },
  {
    "senderPublicKey": "9VT4pX9RMWWBjUos6rg3HXL8cN7SAZPDCUSZa3mCvs4t",
    "quantity": 1,
    "fee": 100000,
    "description": "https://docs.wavesplatform.com/_theme/brand-logo/waves-docs-logo.png",
    "type": 3,
    "version": 2,
    "reissuable": false,
    "script": null,
    "sender": "3N7vkrDS5SshppzygYW9X7khMBmAKRt8yu1",
    "feeAssetId": null,
    "chainId": 84,
    "proofs": [
      "5qipCzskAf3PPwEri2ycq4nSywK8dydfnNfRNZtmv1xdi3udKCVuSCLqaSpcu6HB92Nw7utF4m4ZiJVTLJf84LeQ"
    ],
    "assetId": "HAjTzgA2BuonC8tUZwWHxmB9RvfeX6YJtKDewypkdsxf",
    "decimals": 0,
    "name": "trololo 123",
    "id": "HAjTzgA2BuonC8tUZwWHxmB9RvfeX6YJtKDewypkdsxf",
    "timestamp": 1566838754079
  },
  {
    "senderPublicKey": "9VT4pX9RMWWBjUos6rg3HXL8cN7SAZPDCUSZa3mCvs4t",
    "quantity": 1,
    "fee": 100000,
    "description": "https://docs.wavesplatform.com/_theme/brand-logo/waves-docs-logo.png",
    "type": 3,
    "version": 2,
    "reissuable": false,
    "script": null,
    "sender": "3N7vkrDS5SshppzygYW9X7khMBmAKRt8yu1",
    "feeAssetId": null,
    "chainId": 84,
    "proofs": [
      "2mtVJe1SYAJ4Q1ofEsaFv6cunEwbCqdPdxMKuTeAN96jWXs8APQnJcrZ4Wvz17VyeFzcm5SynTdfhdV4UKA4ZZvw"
    ],
    "assetId": "BEAc249UqhJND4MNWm5FF6gciz2Pmbj3aaMVT7TSstEj",
    "decimals": 0,
    "name": "my test lot 222",
    "id": "BEAc249UqhJND4MNWm5FF6gciz2Pmbj3aaMVT7TSstEj",
    "timestamp": 1566836831657
  },
];

export class Assets extends React.Component {
  state = {
    searchValue: undefined,
    appliedSearchValue: undefined,
    selectedItemId: undefined,
    screen: "VIEW",
  };

  getFilteredAssets = () => {
    return this.state.appliedSearchValue ? assets.filter(asset => {
      return asset.name.includes(this.state.appliedSearchValue);
    }) : assets;
  };

  handleSearchSubmit = (value) => {
    this.setState({
      appliedSearchValue: value
    });
  };

  handleSearchChange = (value) => {
    this.setState({
      searchValue: value
    });
  };

  handleSearchClear = () => {
    this.setState({
      searchValue: undefined
    });
  };

  handleItemSelect = (id) => {
    this.setState({
      selectedItemId: this.state.selectedItemId === id ? undefined : id
    });
  };

  handleCreateAuction = () => {
    this.setState({
      screen: "CREATE_AUCTION"
    });
  };

  renderAssetsViewer = () => {
    return (
      <View style={{
        flex: 1
      }}>
        <SearchBar
          value={this.state.searchValue}
          placeholder="Поиск..."
          onSubmit={this.handleSearchSubmit}
          onCancel={this.handleSearchClear}
          onChange={this.handleSearchChange}
        />
        <AssetList
          assets={this.getFilteredAssets()}
          onItemSelect={this.handleItemSelect}
          selectedItemId={this.state.selectedItemId}
          onCreateAuction={this.handleCreateAuction}
        />
      </View>
    );
  };

  renderCreateAuction = () => {
    return (
      <CreateAuction item={assets.find(asset => asset.id === this.state.selectedItemId)}/>
    )
  };

  renderView = () => {
    switch (this.state.screen) {
      case "VIEW":
        return this.renderAssetsViewer();
      case "CREATE_AUCTION":
        return this.renderCreateAuction();
    }
  };

  render () {
    return (
      <View style={{
        flex: 1
      }}>
        {this.renderView()}
      </View>
    )
  }
}