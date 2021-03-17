import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CreateRequest from './src/screens/DiscountRequest/CreateRequest'
import RequestList from './src/screens/DiscountRequest/Index'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CreateRequest />
      {/* <RequestList /> */}
    </View>
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
