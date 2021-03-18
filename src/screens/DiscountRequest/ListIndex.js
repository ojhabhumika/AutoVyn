import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Tab, TabView } from '@ui-kitten/components';
import useRequest from '../../hooks/useRequest';
import RequestList from './RequestList'

const Index = () => {

    const { makeRequest } = useRequest();
    const shouldLoadComponent = (index) => index === selectedIndex;

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [discountReqList, setDiscountReqList] = useState([])
    const [bankNames, setBankNames] = useState([])
    const [userNames, setUserNames] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        makeRequest({
            url: '/discountRequests',
            method: 'GET',
            onSuccess: (res) => {
                setDiscountReqList(res.userRequests);
                setBankNames(res.bankNames)
                setUserNames(res.userNames)
            },
            onError: () => setLoading(false)
        })
    }, []);


    return (
        <TabView
            selectedIndex={selectedIndex}
            shouldLoadComponent={shouldLoadComponent}
            onSelect={index => setSelectedIndex(index)}
        >
            <Tab title='PROCESSING' key="0">
                <RequestList
                    discountReqList={discountReqList.filter(e => e.status === null)}
                    bankNames={bankNames}
                    userNames={userNames}
                    loading={loading}
                    setLoading={setLoading}
                />
            </Tab>
            <Tab title='ACCEPTED' key="1">
                <RequestList
                    discountReqList={discountReqList.filter(e => e.status === true)}
                    bankNames={bankNames}
                    userNames={userNames}
                    loading={loading}
                    setLoading={setLoading}
                />
            </Tab>
            <Tab title='REJECTED' key="2">
                <RequestList
                    discountReqList={discountReqList.filter(e => !(e.status == null || e.status == true))}
                    bankNames={bankNames}
                    userNames={userNames}
                    loading={loading}
                    setLoading={setLoading}
                />
            </Tab>
        </TabView>
    );
};

export default Index

