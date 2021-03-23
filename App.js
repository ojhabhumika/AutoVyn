import React, { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import HomeNavigator from './src/HomeNavigator'
import SplashScreen from 'react-native-splash-screen'

export default function App() {
  useEffect(() => {
    SplashScreen.hide()
  },[])
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        
          <HomeNavigator />
      </ApplicationProvider>
    </>
  );
}
