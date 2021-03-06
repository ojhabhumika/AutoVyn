import React, { useState } from 'react'
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get('window')
import colors from '../constants/Colors'
import useRequest from '../hooks/useRequest';

const Login = ({ navigation }) => {

    const { makeRequest } = useRequest();

    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [showPwd, setShowPassword] = useState(false)

    const [showUserMsg, setShowUserMsg] = useState(false)
    const [showPwdMsg, setShowPwdMsg] = useState(false)
    const [showValidMsg, setShowValidMsg] = useState(false)

    const validateUserName = () => {
        setShowUserMsg(false)
        if (!userName) setShowUserMsg(true)
    }
    const validatePwd = () => {
        setShowPwdMsg(false)
        if (!password) setShowPwdMsg(true)
    }

    const onSumbit = () => {
        validateUserName()
        validatePwd()
        setShowValidMsg(false)

        if (userName && password) {
            makeRequest({
                url: '/login',
                method: 'POST',
                body: { userName, password },
                onSuccess: async (res) => {

                    await AsyncStorage.setItem('@token', res.token)
                    await AsyncStorage.setItem('@user', JSON.stringify(res))
                    navigation.push('Dashboard')
                },
                onFailure: () => setShowValidMsg(true)
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={{
                height: '40%', alignItems: 'center',
                justifyContent: 'center', paddingTop: 50
            }}>
                <Image style={{ width: width / 2, height: width / 2 }}
                    source={require('../../assets/AutoVyn_Logo.jpeg')} />
            </View>
            <View style={{ flex: 1, margin: 30, marginTop: 30 }}>
                <View style={[styles.inputView,
                { borderBottomColor: (!showUserMsg ? "gray" : colors.logoRed) }
                ]}
                >
                    <Icon name={'account'} size={27} color={'#969696'} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Enter UserName...'
                        placeholderTextColor="#969696"
                        autoFocus={true}
                        value={userName}
                        onChangeText={text => {
                            setUserName(text.trim())
                        }}
                        onBlur={validateUserName}
                    />
                </View>
                <View style={{ marginBottom: 10 }}>
                    {
                        showUserMsg &&
                        <Text style={styles.errorText}>
                            Please enter user name.
                        </Text>
                    }
                </View>
                <View style={[styles.inputView,
                { borderBottomColor: (!showPwdMsg ? "gray" : colors.logoRed) }
                ]}
                >
                    <Icon name={'lock'} size={27} color={'#969696'} />
                    <TextInput
                        style={{ ...styles.textInput, marginLeft: 7 }}
                        placeholder='Enter Password...'
                        placeholderTextColor="#969696"
                        value={password}
                        onChangeText={text => {
                            setPassword(text.trim())
                        }}
                        secureTextEntry={!showPwd}
                        onBlur={validatePwd}
                    />
                    <TouchableOpacity
                        style={{ marginLeft: "auto" }}
                        activeOpacity={1}
                        onPress={() => setShowPassword(!showPwd)}
                    >
                        <Text style={[styles.errorText, { marginBottom: 0, color: '#65BDF2', }]}>
                            {!showPwd ? "SHOW" : "HIDE"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 10 }}>
                    {
                        showPwdMsg &&
                        <Text style={styles.errorText}>
                            Please enter password.
                        </Text>
                    }
                </View>
                <TouchableOpacity style={styles.login}
                    onPress={onSumbit}
                    activeOpacity={0.6}
                >
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                        LOG IN
                    </Text>
                </TouchableOpacity>
                {
                    showValidMsg &&
                    <Text style={[styles.errorText, { marginVertical: 15 }]}>
                        Invalid Credentials.
                    </Text>
                }

                <TouchableOpacity style={{ paddingVertical: 60, alignItems: 'flex-start' }}>
                    <Text style={{ color: '#313131', fontSize: 18 }}>
                        Forgot your password?
                        <Text style={{ color: '#65BDF2', fontSize: 18, fontWeight: "bold" }} > Reset here</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#fff'
    },
    login: {
        backgroundColor: '#65BDF2',
        padding: 15,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        elevation: 5
    },
    textInput: {
        color: '#000',
        fontSize: 16,
        marginHorizontal: 10
    },
    inputView: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    errorText: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.logoRed,
        marginBottom: 15
    }
})