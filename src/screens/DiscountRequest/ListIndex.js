import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import useRequest from '../../hooks/useRequest';
import RequestList from './RequestList'
import NavigationBar from '../../components/NavigationBar'
const { width } = Dimensions.get('window')
const ListIndex = ({ navigation }) => {

    const { makeRequest } = useRequest();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [discountReqList, setDiscountReqList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [userNames, setUserNames] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        makeRequest({
            url: '/discountRequests',
            method: 'GET',
            onSuccess: (res) => {
                console.log('res :>> ', res);
                setDiscountReqList(res.userRequests);
                setUserNames(res.userNames)
            },
            onError: () => setLoading(false)
        })
    }, []);

    useEffect(() => {
        console.log('selectedIndex :>> ', selectedIndex);
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
                <NavigationBar title={'DISCOUNT REQUESTS'} menu={'Dashboard'} goBack navigation={navigation} />
                <TabBarView selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
            </View>
            <RequestList
                filteredList={filteredList}
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

