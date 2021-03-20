import React, { useState } from 'react'
import {
    Divider,
    Layout
} from '@ui-kitten/components';
import {
    View, StyleSheet,
    Dimensions, TouchableOpacity
    , Text, FlatList
} from 'react-native'
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Dashboard = () => {

    const data = [{
        "title": "Discount Approval",
        "icon": <Icon name={'sale'} size={55} color={'#65BDF2'} />,
        "text": "#65BDF2",
        "bg": "#EFF8FD"

    },
    {
        "title": "Vehicle Delivery",
        "icon": <Icon name={'car-back'} size={55} color={'#7659BE'} />,
        "text": "#7659BE",
        "bg": "#F1EEF8"//"#E3DDF2"
    },
    {
        "title": "Sales",
        "icon": <Icon name={'finance'} size={55} color={'#E680AA'} />,
        "text": "#E680AA",
        "bg": "#FCF2F6"
    },
    {
        "title": "Service",
        "icon": <Icon name={'face-agent'} size={55} color={'#F47B2D'} />,
        "text": "#F47B2D",
        "bg": "#FDF1EA"
    },
    {
        "title": "Finance",
        "icon": <Icon name={'currency-inr'} size={55} color={'#5c83e5'} />,
        "text": "#5c83e5",
        "bg": "#EEF2FC"
    },
    {
        "title": "MIS",
        "icon": <Icon name={'file-chart'} size={55} color={'#37c65b'} />,
        "text": "#37c65b",
        "bg": "#ebfbef"
    }]

    return (
        <Layout style={styles.container}>
            <NavigationBar />
            <View style={styles.listContainer}>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <ListItem item={item} />
                    )} />
            </View>
        </Layout>
    )
}

const NavigationBar = () => {
    return (
        <View style={styles.toolbar}>
            <Text style={{ flex: 1 }}></Text>
            <TouchableOpacity style={{ padding: 15 }}>
                <Text style={{ flex: 1, color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                    {/* Log Out */}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const ListItem = ({ item }) => {

    return (
        <TouchableOpacity style={styles.item}>
            <View style={{
                backgroundColor: item.bg,
                padding: 20,
                borderRadius: 50
            }}>
                {item.icon}
            </View>
            <Text style={{
                paddingVertical: 10, color: item.text,
                paddingTop: 15,
                fontSize: 18, fontWeight: 'bold', textAlign: 'center'
            }}>
                {item.title}
            </Text>
        </TouchableOpacity>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EAE9E9'
    },
    toolbar: {
        width: '100%',
        backgroundColor: '#EAE9E9',
        height: 55,
        flexDirection: 'row'
    },
    item: {
        maxWidth: Dimensions.get('window').width / 2,
        flex: 0.5,
        height: height / 4,
        backgroundColor: '#fff',
        marginBottom: 16,
        marginHorizontal: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 25
    }
})