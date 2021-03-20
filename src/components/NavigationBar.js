import React from 'react'
import {
    Icon
} from '@ui-kitten/components';
import { View,TouchableOpacity, Text } from 'react-native'

const NavigationBar = ({title, menu, goBack,navigation,style}) => {
    return (
        <View style={{width: '100%',
            backgroundColor:'orange',
            height:55,
            // shadowColor:'gray',
            // elevation:9,
            // shadowOpacity:1,
            flexDirection:'row',alignItems:'center'}}>
            {goBack && 
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                <Icon name='arrow-back-outline' width={35} height={35} fill={'#fff'} style={{marginLeft:15}}/>
            </TouchableOpacity>
            }
            <Text style={{flex:1,marginLeft:22,color:'#fff',fontSize:20,fontWeight:'bold'}}>{title}</Text>
            <TouchableOpacity style={{padding:10}}>
                <Icon name='more-vertical-outline' width={30} height={30} fill={'#fff'}/>
            </TouchableOpacity>
        </View>
    )
}

export default NavigationBar