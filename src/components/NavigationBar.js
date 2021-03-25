import React, { useState } from 'react'
import {
    Popover
} from '@ui-kitten/components';
import { View, TouchableOpacity, Text, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NavigationBar = ({ title, navigation }) => {

    const [showMenuOption, setShowOptionMenu] = useState(false)

    const renderMenu = () => {
        return <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => setShowOptionMenu(true)}>
            <Icon name='dots-vertical' size={30} color={"#FFF"} />
        </TouchableOpacity>
    }

    const handleLogout = async () => {
        setShowOptionMenu(false)
        await AsyncStorage.removeItem('@token')
        await AsyncStorage.removeItem('@user')
        navigation.push("Login")
    }

    return (
        <View style={{
            width: '100%',
            backgroundColor: colors.logoBlue,
            height: 55,
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5
            //borderBottomColor: "#e3e3e3",
            //borderBottomWidth: 1,
            // shadowColor: 'gray',
            // elevation: 9,
            // shadowOpacity: 1,
        }}>

            <Text style={{
                flex: 1, marginLeft: 22,
                color: '#FFF', fontSize: 25, fontWeight: 'bold',
                textAlign: "center"
            }}>{title}</Text>

            <Popover
                style={{ marginTop: (Platform.OS == 'ios' ? -40 : 0) }}
                visible={showMenuOption}
                anchor={renderMenu}
                onBackdropPress={() => setShowOptionMenu(false)}>
                <TouchableOpacity activeOpacity={0.8} onPress={handleLogout} >
                    <Text style={{ marginBottom: 5, color: 'gray', paddingHorizontal: 20, paddingVertical: 15, fontSize: 18, fontWeight: 'bold' }}>Log Out</Text>
                </TouchableOpacity>
            </Popover>

        </View>
    )
}

export default NavigationBar