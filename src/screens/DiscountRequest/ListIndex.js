import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import useRequest from '../../hooks/useRequest';
import RequestList from './RequestList'
import NavigationBar from '../../components/NavigationBar'

const { width } = Dimensions.get('window')
const ListIndex = ({ navigation }) => {

    const { makeRequest } = useRequest();

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [discountReqList, setDiscountReqList] = useState([])
    const [userNames, setUserNames] = useState([])
    const [loading, setLoading] = useState(false)

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


    return (
        <>
            <View style={{ shadowColor: 'gray', elevation: 9, shadowOpacity: 1 }}>
                <NavigationBar title={'DISCOUNT REQUESTS'} menu={'Dashboard'} goBack navigation={navigation} />
                <TabBarView selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
            </View>
            <RequestList
                discountReqList={discountReqList.filter(e => e.status === (selectedIndex == 0 ? null : (selectedIndex == 1 ? true : !(null || true))))}
                userNames={userNames}
                loading={loading}
                setLoading={setLoading}
                selectedIndex={selectedIndex}
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
                <Text style={{ fontWeight: 'bold', color: selectedIndex == 0 ? '#65BDF2' : 'white' }}>
                    PROCESSING
                </Text>
            </TouchableOpacity>
            <TouchableOpacity

                onPress={() => setSelectedIndex(1)}
                style={{ ...styles.button, backgroundColor: selectedIndex == 1 ? '#fff' : '#65BDF2' }}>
                <Text style={{ fontWeight: 'bold', color: selectedIndex == 1 ? '#65BDF2' : 'white' }}>
                    ACCEPTED
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setSelectedIndex(2)}
                style={{ ...styles.button, backgroundColor: selectedIndex == 2 ? '#fff' : '#65BDF2' }}>
                <Text style={{ fontWeight: 'bold', color: selectedIndex == 2 ? '#65BDF2' : 'white' }}>
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
    }
})

