import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import useRequest from '../../hooks/useRequest';
import RequestList from './RequestList'
const { width } = Dimensions.get('window')
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../constants/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ListIndex = ({ navigation }) => {

    const { makeRequest } = useRequest();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [discountReqList, setDiscountReqList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [userNames, setUserNames] = useState([])
    const [loading, setLoading] = useState(false)

    const [canUserCreateReq, setUserCreateReq] = useState(false)
    const [canUserApproveReq, setUserApproveReq] = useState(false)

    useEffect(() => {
        (async () => {
            const asyncData = await AsyncStorage.getItem('@user')
            const data = JSON.parse(asyncData)
            if (data) {
                setUserCreateReq(data.user.canRaiseDiscount)
                setUserApproveReq(data.user.canApproveDiscount)
            }
        })();
    }, []);

    useEffect(() => {
        setLoading(true);
        makeRequest({
            url: '/discountRequests',
            method: 'GET',
            onSuccess: (res) => {
                setDiscountReqList(res.userRequests);
                setUserNames(res.userNames)
            },
            onError: () => setLoading(false)
        })
    }, []);

    useEffect(() => {
        if (discountReqList.length > 0) {
            if (selectedIndex == 0) {
                let data = discountReqList.filter(e => e.status === null)
                return setFilteredList(data)
            }
            if (selectedIndex == 1) {
                let data = discountReqList.filter(e => e.status === true)
                return setFilteredList(data)
            }
            if (selectedIndex == 2) {
                let data = discountReqList.filter(e => !(e.status === null || e.status == true))
                return setFilteredList(data)
            }
        }

    }, [discountReqList, selectedIndex]);


    return (
        <>
            <View style={{ shadowColor: 'gray', elevation: 9, shadowOpacity: 1 }}>
                <View style={styles.navBar}>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                        <Icon name='arrow-left' size={30} color={colors.text} style={{ marginLeft: 15 }} />
                    </TouchableOpacity>

                    <Text style={styles.navTitle}>DISCOUNT REQUESTS</Text>
                    {
                        canUserCreateReq &&
                        <TouchableOpacity
                            style={{ padding: 10 }}
                            onPress={() => navigation.push('CreateRequest')}>
                            <Icon name='plus-thick' size={30} color={colors.text} style={{ marginLeft: 15 }} />
                        </TouchableOpacity>
                    }

                </View>

                <TabBarView selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
            </View>
            <RequestList
                discountReqList={discountReqList}
                setDiscountReqList={setDiscountReqList}
                filteredList={filteredList}
                userNames={userNames}
                loading={loading}
                setLoading={setLoading}
                selectedIndex={selectedIndex}
                canUserApproveReq={canUserApproveReq}
            />
        </>
    );
};

const TabBarView = ({ selectedIndex, setSelectedIndex }) => {

    return (
        <View style={styles.tabView}>
            <TouchableOpacity
                onPress={() => setSelectedIndex(0)}
                style={{ ...styles.button, backgroundColor: selectedIndex == 0 ? '#fff' : '#65BDF2' }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: selectedIndex == 0 ? '#65BDF2' : 'white' }}>
                    PROCESSING
                </Text>
            </TouchableOpacity>
            <TouchableOpacity

                onPress={() => setSelectedIndex(1)}
                style={{ ...styles.button, backgroundColor: selectedIndex == 1 ? '#fff' : '#65BDF2' }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: selectedIndex == 1 ? '#65BDF2' : 'white' }}>
                    ACCEPTED
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setSelectedIndex(2)}
                style={{ ...styles.button, backgroundColor: selectedIndex == 2 ? '#fff' : '#65BDF2' }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: selectedIndex == 2 ? '#65BDF2' : 'white' }}>
                    REJECTED
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ListIndex

const styles = StyleSheet.create({
    tabView: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#65BDF2'
    },
    button: {
        width: width / 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navBar: {
        width: '100%',
        backgroundColor: '#FFF',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 2,
        // shadowColor: 'gray',
        // elevation: 9,
        // shadowOpacity: 1
    },
    navTitle: {
        flex: 1,
        marginLeft: 22,
        color: colors.text,
        fontSize: 20,
        fontWeight: 'bold'
    }
})

