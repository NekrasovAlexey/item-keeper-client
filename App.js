/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import Button from '@ant-design/react-native/es/button';
import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ToastExample from './ToastExample';
import {Icon, TabBar, Tabs, Provider} from "@ant-design/react-native";
import {Assets} from "./src/modules/Assets/Assets";
import {Trade} from "./src/modules/Trade/Trade";
import ruRU from '@ant-design/react-native/lib/locale-provider/ru_RU';

class App extends React.Component {
  state = {
    status: 'init'
  };

  render () {
    return (
      <Provider locale={ruRU}>
        <Tabs tabs={[
          {
            title: "My assets"
          },
          {
            title: "Trade"
          }
        ]}>
          <Assets/>
          <Trade/>
        </Tabs>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
