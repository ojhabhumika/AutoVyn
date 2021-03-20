import React from 'react'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import RequestList from './screens/DiscountRequest/RequestList';
import ListIndex from './screens/DiscountRequest/ListIndex'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => {
    return (
        <NavigationContainer>
            <Navigator headerMode={'none'} initialRouteName={'Login'}>
                <Screen name="Login" component={Login} />
                <Screen name="Dashboard" component={Dashboard} />
                <Screen name="RequestList" component={RequestList} />
                <Screen name="ListIndex" component={ListIndex} />
            </Navigator>
        </NavigationContainer>
    )
}

export default HomeNavigator