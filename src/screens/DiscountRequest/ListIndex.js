import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Tab, TabView } from '@ui-kitten/components';
import useRequest from '../../hooks/useRequest';
import RequestList from './RequestList'
import Loading from '../../components/Loading'
import NavigationBar from '../../components/NavigationBar'

const ListIndex = ({navigation}) => {

    const { makeRequest } = useRequest();
    const shouldLoadComponent = (index) => index === selectedIndex;

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
        <NavigationBar title={''} menu={'Dashboard'} goBack navigation={navigation}/>
        {/* <View>
            <TouchableOpacity>
                <Text>Proccess</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text></Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text></Text>
            </TouchableOpacity>
        </View> */}
        <TabView
            selectedIndex={selectedIndex}
            shouldLoadComponent={shouldLoadComponent}
            onSelect={index => setSelectedIndex(index)}
            style={{flex:1}}
            tabBarStyle={{backgroundColor:'white'}}
            indicatorStyle={{ backgroundColor: 'orange' }}
        >
            <Tab title='PROCESSING' key="0"
                style={{paddingVertical:10}}>
                <RequestList
                    discountReqList={discountReqList.filter(e => e.status === null)}
                    userNames={userNames}
                    loading={loading}
                    setLoading={setLoading}
                    selectedIndex={selectedIndex}
                />
            </Tab>
            <Tab title='ACCEPTED' key="1">
                <RequestList
                    discountReqList={discountReqList.filter(e => e.status === true)}
                    userNames={userNames}
                    selectedIndex={selectedIndex}
                    loading={loading}
                    setLoading={setLoading}
                />
            </Tab>
            <Tab title='REJECTED' key="2">
                <RequestList
                    discountReqList={discountReqList.filter(e => !(e.status == null || e.status == true))}
                    userNames={userNames}
                    loading={loading}
                    selectedIndex={selectedIndex}
                    setLoading={setLoading}
                />
            </Tab>
        </TabView>
        </>
    );
};

export default ListIndex

