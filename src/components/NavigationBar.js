import React, { useState } from 'react'
import { View, TouchableOpacity, Text, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NavigationBar = ({ title, navigation }) => {

    const [showMenuOption, setShowOptionMenu] = useState(false)

    const handleLogout = async () => {
        setShowOptionMenu(false)
        await AsyncStorage.removeItem('@token')
        await AsyncStorage.removeItem('@user')
        navigation.push("Login")
    }

    return (
        <View style={{
            width: '100%',
            backgroundColor: colors.white,
            height: 55,
            flexDirection: 'row',
            alignItems: 'center',
        }}>

            <Text style={{
                flex: 1, marginLeft: 22,
                color: colors.text, fontSize: 25, fontWeight: 'bold',
                textAlign: "center"
            }}>{title}</Text>

                
                <TouchableOpacity
                    style={{ padding: 10 }}
                    activeOpacity={0.8}
                    onPress={() => setShowOptionMenu(!showMenuOption)}>
                    <Icon name='dots-vertical' size={30} color={"#FFF"} />
                </TouchableOpacity>
                {showMenuOption && 
                <TouchableOpacity activeOpacity={0.8} onPress={handleLogout} 
                style={{backgroundColor:'#fff',paddingHorizontal:20,paddingVertical: 8,position:'absolute',top:45,right:10,borderRadius:5,shadowColor:'gray',elevation:6,shadowOffset:0.5}}>
                    <Text style={{ marginBottom: 5, color: 'gray',  fontSize: 18, fontWeight: 'bold' }}>Log Out</Text>
                </TouchableOpacity> }

        </View>
    )
}

export default NavigationBar