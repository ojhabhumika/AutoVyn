import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login'
import ListIndex from './src/screens/DiscountRequest/ListIndex'
import CreateRequest from './src/screens/DiscountRequest/CreateRequest'
import Dashboard from './src/screens/Dashboard'
import HomeNavigator from './src/HomeNavigator'

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {/* <Login /> */}
        {/* <ListIndex /> */}
        {/* <CreateRequest /> */}
        {/* < Dashboard/> */}
        <HomeNavigator />
      </ApplicationProvider>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
