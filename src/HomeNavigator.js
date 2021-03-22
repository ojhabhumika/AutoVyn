import React, { useState, useEffect } from 'react'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import CreateRequest from './screens/DiscountRequest/CreateRequest';
import ListIndex from './screens/DiscountRequest/ListIndex'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => {

    const [token, setToken] = useState(false)

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('@token')
            setToken(token)
        })();
    }, []);

    return (
        <NavigationContainer>
            <Navigator headerMode={'none'} initialRouteName={token ? "Dashboard" : "Login"}>
                {!token && <Screen name="Login" component={Login} />}
                <Screen name="Dashboard" component={Dashboard} />
                <Screen name="ListIndex" component={ListIndex} />
                <Screen name="CreateRequest" component={CreateRequest} />
            </Navigator>
        </NavigationContainer>
    )
}

export default HomeNavigator