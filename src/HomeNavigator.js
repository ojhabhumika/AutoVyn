import React from 'react'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import CreateRequest from './screens/DiscountRequest/CreateRequest';
import ListIndex from './screens/DiscountRequest/ListIndex'

import { UserProvider } from '../src/context/UserContext'
const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => {
    return (
        <UserProvider>
            <NavigationContainer>
                <Navigator headerMode={'none'} initialRouteName={'Login'}>
                    <Screen name="Login" component={Login} />
                    <Screen name="Dashboard" component={Dashboard} />
                    <Screen name="ListIndex" component={ListIndex} />
                    <Screen name="CreateRequest" component={CreateRequest} />
                </Navigator>
            </NavigationContainer>
        </UserProvider>
    )
}

export default HomeNavigator