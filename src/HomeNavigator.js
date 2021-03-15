import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => {
    return (
        <Navigator headerMode={'none'} initialRouteName={'Login'}>
            <Screen name="Login" component={Login} />
            <Screen name="Dashboard" component={Dashboard} />
        </Navigator>
    )
}

export default HomeNavigator