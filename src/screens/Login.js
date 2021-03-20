import React, { useState } from 'react'
import {
    Layout,
    Icon
} from '@ui-kitten/components';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, Text } from 'react-native'
const { width } = Dimensions.get('window')
import colors from '../constants/Colors'
import useRequest from '../hooks/useRequest';

const Login = ({navigation}) => {

    const { makeRequest } = useRequest();
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [showPwd, setShowPassword] = useState(false)

    const [isUserNameValid, setIsUserNameValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isValid, setIsValid] = useState(true)

    const validateUserName = () => {
        setIsUserNameValid(true)
        if (!userName) setIsUserNameValid(false)
    }

    const validatePwd = () => {
        setIsPasswordValid(true)
        if (!password) setIsPasswordValid(false)
    }

    const onSumbit = () => {
        return navigation.navigate('Dashboard')
        validateUserName()
        validatePwd()
        if (isUserNameValid && isPasswordValid) {
            makeRequest({
                url: '/login',
                method: 'POST',
                body: { userName, password },
                onSuccess: (res) => {
                    setIsValid(true)
                    navigation.navigate('Dashboard')
                    //setUser from context
                },
                onFailure: () => setIsValid(false)
            })
        }
    }

    return (
        <Layout style={styles.container}>
            <View style={{ height: '40%', alignItems: 'center', 
            justifyContent: 'center', paddingTop: 50 }}>
                <Image style={{ width: width / 2, height: width / 2 }}
                    source={require('../../assets/AutoVyn_Logo.jpeg')} />
            </View>
            <View style={{ flex: 1, margin: 30, marginTop: 0 }}>
                <View style={[styles.inputView,
                { borderBottomColor: (isUserNameValid ? "gray" : colors.logoRed) }
                ]}
                >
                    <Icon name={'email-outline'} width={25} height={25} fill={'#969696'} />
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
                        !isUserNameValid &&
                        <Text style={styles.errorText}>
                            User name cannot be empty
                        </Text>
                    }
                </View>
                <View style={[styles.inputView,
                { borderBottomColor: (isPasswordValid ? "gray" : colors.logoRed) }
                ]}
                >
                    <Icon name={'lock-outline'} width={28} height={28} fill={'#969696'} />
                    <TextInput
                        style={{ ...styles.textInput, marginLeft: 7 }}
                        placeholder='Enter Password...'
                        placeholderTextColor="#969696"
                        value={password}
                        onChangeText={text => {
                            setPassword(text.trim())
                        }}
                        secureTextEntry={showPwd}
                        onBlur={validatePwd}
                    />
                    <TouchableOpacity
                        style={{ marginLeft: "auto" }}
                        activeOpacity={1}
                        onPress={() => setShowPassword(!showPwd)}
                    >
                        <Text style={[styles.errorText, { marginBottom: 0, color: '#65BDF2' }]}>
                            {showPwd ? "SHOW" : "HIDE"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 10 }}>
                    {
                        !isPasswordValid &&
                        <Text style={styles.errorText}>
                            Password cannot be empty
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
                    !isValid &&
                    <Text style={{...styles.errorText, marginVertical: 15 }}>
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
        </Layout >
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
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