import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StyleSheet } from 'react-native';
import { UserProvider } from './src/context/UserContext'
import HomeNavigator from './src/HomeNavigator'

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {/* <UserProvider> */}
          <HomeNavigator />
        {/* </UserProvider> */}
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
