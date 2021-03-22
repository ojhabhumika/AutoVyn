import React, { useState } from 'react'
import {
    Icon,
    Popover
} from '@ui-kitten/components';
import { View, TouchableOpacity, Text, Platform } from 'react-native'

const NavigationBar = ({ title, menu, goBack, navigation, style, hide }) => {

    const [showMenuOption, setShowOptionMenu] = useState(false)

    const onPress = () => {
        if (menu != "logout") navigation.navigate('CreateRequest')
    }

    const renderMenu = () => {
        return <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => setShowOptionMenu(true)}>
            {
                menu == "logout" ? <Icon name='more-vertical-outline' width={30} height={30} fill={'#fff'} /> : <Icon name='plus-outline' width={30} height={30} fill={'#000'} />
            }

        </TouchableOpacity>
    }
    const handleLogout = () => {
        console.log('logout');
    }

    return (
        <View style={{
            width: '100%',
            backgroundColor: '#65BDF2',
            height: 55,
            ...style,
            flexDirection: 'row', alignItems: 'center'
        }}>
            {goBack &&
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back-outline' width={35} height={35} fill={'#fff'} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
            }
            <Text style={{ flex: 1, marginLeft: 22, color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
            {!hide &&
                (menu == "logout" ?
                    <Popover
                        style={{ marginTop: (Platform.OS == 'ios' ? -40 : 0) }}
                        visible={showMenuOption}
                        anchor={renderMenu}
                        onBackdropPress={() => setShowOptionMenu(false)}>
                        <TouchableOpacity activeOpacity={0.8} onPress={handleLogout} >
                            <Text style={{ marginBottom: 5, color: 'gray', paddingHorizontal: 20, paddingVertical: 15, fontSize: 18, fontWeight: 'bold' }}>Log Out</Text>
                        </TouchableOpacity>
                    </Popover> :
                    <TouchableOpacity
                        style={{ padding: 10 }}
                        onPress={onPress}>
                        <Icon name='plus-circle-outline' width={30} height={30} fill={'#fff'} />
                    </TouchableOpacity>)
            }

        </View>
    )
}

export default NavigationBar