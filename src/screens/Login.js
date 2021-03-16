import React, {useState} from 'react'
import {
    Divider,
    Layout,
    Icon
} from '@ui-kitten/components';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, Text } from 'react-native'
const {width, height} = Dimensions.get('window')


const Login = () => {

    const [email, setEmai] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Layout style={styles.container}>
            <View style={{height: '40%',alignItems:'center',justifyContent:'center',paddingTop:50}}>
                <Image style={{ width: width/2, height: width/2 }} 
                source={ require('../../assets/AutoVyn_Logo.jpeg' )} />
            </View>
            <View style={{flex:1, margin:25}}>
                <View style={styles.inputView}>
                    <Icon name={'email-outline'} width={25} height={25} fill={'#969696'}/>
                <TextInput
                    style={styles.textInput}
                    placeholder='Enter Email...'
                    placeholderTextColor="#969696"
                    autoFocus={true}
                    value={email}
                    onChangeText={text => {
                    }}
                    />
                </View>
                <View style={styles.inputView}>
                <Icon name={'lock-outline'} width={28} height={28} fill={'#969696'}/>
                <TextInput
                    style={{...styles.textInput,marginLeft:7}}
                    placeholder='Enter Password...'
                    placeholderTextColor="#969696"
                    value={password}
                    onChangeText={text => {
                    }}
                    />
                </View>
                <TouchableOpacity style={styles.login}>
                    <Text style={{color: '#fff',fontSize: 18,fontWeight: 'bold'}}>
                        LOG IN
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:15,alignItems:'center'}}>
                    <Text style={{color: '#313131',fontSize: 16}}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>
            </View>    
        </Layout>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent: 'center'
    },
    login: {
        backgroundColor: 'orange',
        padding:15,
        marginTop:15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
        shadowColor:'gray',
        shadowOpacity:0.5,
        elevation:5
    },
    textInput: {
        color:'#000',
        fontSize:16,
        marginHorizontal: 10
    },
    inputView: {
        borderBottomColor:'gray',
        borderBottomWidth:1,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    }
})