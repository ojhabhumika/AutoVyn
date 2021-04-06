import React, { useState, useEffect } from 'react'
import {
    View, StyleSheet,
    Dimensions, TouchableOpacity
    , Text, FlatList, ToastAndroid
} from 'react-native'
const { height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationBar from '../components/NavigationBar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/Colors'

const Dashboard = ({ navigation }) => {

    const [userName, setUserName] = useState()
    const [userLocations, setUserLocations] = useState([])
    const [canUserCreateReq, setUserCreateReq] = useState(false)
    const [canUserApproveReq, setUserApproveReq] = useState(false)

    useEffect(() => {
        (async () => {
            const asyncData = await AsyncStorage.getItem('@user')
            const data = JSON.parse(asyncData)
            if (data) {
                //console.log('data :>> ', data);
                setUserName(data.user?.userName)
                let locs = data.userLocations.join(", ")
                setUserLocations(locs)
                setUserCreateReq(data.user.canRaiseDiscount)
                setUserApproveReq(data.user.canApproveDiscount)
            }
        })();
    }, []);


    const data = [{
        title: "Discount Approval",
        icon: <Icon name={'sale'} size={55} color={'#339989'} />,
        text: "#339989",
        bg: "#e7f7f5",
        permission: canUserCreateReq || canUserApproveReq,
        onPress: () => navigation.push('ListIndex')
    },
    {
        title: "Vehicle Delivery",
        icon: <Icon name={'car-back'} size={55} color={'#7659BE'} />,
        text: "#7659BE",
        bg: "#F1EEF8",
        permission: true,
        onPress: () => ToastAndroid.show("In Progress!", ToastAndroid.SHORT)
    },
    {
        title: "Sales",
        icon: <Icon name={'finance'} size={55} color={'#E680AA'} />,
        text: "#E680AA",
        bg: "#FCF2F6",
        permission: true,
        onPress: () => ToastAndroid.show("In Progress!", ToastAndroid.SHORT)
    },
    {
        title: "Service",
        icon: <Icon name={'face-agent'} size={55} color={'#F47B2D'} />,
        text: "#F47B2D",
        "bg": "#FDF1EA",
        permission: true,
        onPress: () => ToastAndroid.show("In Progress!", ToastAndroid.SHORT)
    },
    {
        title: "Finance",
        icon: <Icon name={'currency-inr'} size={55} color={'#5c83e5'} />,
        text: "#5c83e5",
        bg: "#EEF2FC",
        permission: true,
        onPress: () => ToastAndroid.show("In Progress!", ToastAndroid.SHORT)
    },
    {
        title: "MIS",
        icon: <Icon name={'file-chart'} size={55} color={'#37c65b'} />,
        text: "#37c65b",
        bg: "#ebfbef",
        permission: true,
        onPress: () => ToastAndroid.show("In Progress!", ToastAndroid.SHORT)
    }]

    return (
        <View style={styles.container}>

            <NavigationBar
                //title={"AUTO-VYN"}
                navigation={navigation}
            />

            <View style={{
                flexDirection: "column",
                borderRadius: 10,
                marginBottom: 15,
                marginHorizontal: 25,

            }}>
                <Text style={[styles.userText, { fontSize: 25, fontWeight: "bold", }]}>Welcome, {userName}</Text>
                <Text style={styles.userText}>{userLocations}</Text>
            </View>

            <View style={styles.listContainer}>

                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <ListItem item={item} />
                    )}
                />
            </View>

        </View>
    )
}

const ListItem = ({ item }) => {

    const onPress = () => {
        if (item.permission) {
            item.onPress();
        }
        else {
            ToastAndroid.show("No Access!", ToastAndroid.SHORT)
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.item}>
            <View style={{
                backgroundColor: item.bg,
                padding: 15,
                borderRadius: 60
            }}>
                {item.icon}
            </View>
            <Text style={{
                paddingTop: 10, color: item.text,
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
        justifyContent: 'flex-start',
        backgroundColor: colors.logoBlue,
    },
    item: {
        maxWidth: Dimensions.get('window').width / 2,
        flex: 0.5,
        height: height / 5,
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 12,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#e3e3e3",
        shadowOpacity: 0.5,
        elevation: 5,
        borderWidth: 1,
        borderColor: "#e3e3e3",
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        position: "absolute",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingVertical: 20,
        bottom: 0,
    },
    userText: {
        fontSize: 20,
        color: "#FFF",
        paddingBottom: 8,
    }
})