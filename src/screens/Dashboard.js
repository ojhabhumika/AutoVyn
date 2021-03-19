import React, {useState} from 'react'
import {
    Divider,
    Layout,
    Icon
} from '@ui-kitten/components';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, Text, FlatList } from 'react-native'
const {width, height} = Dimensions.get('window')


const Dashboard = () => {

    const data = [{
        "title": "Discount Approval",
        "icon": <Icon name={'person-outline'} width={50} height={50} fill={'#969696'}/>
    },{
        "title": "Vehicle Delivery",
        "icon": <Icon name={'person-outline'} width={50} height={50} fill={'#969696'}/>
    },{
        "title": "Sales",
        "icon": <Icon name={'person-outline'} width={50} height={50} fill={'#969696'}/>
    },{
        "title": "Service",
        "icon": <Icon name={'person-outline'} width={50} height={50} fill={'#969696'}/>
    },{
        "title": "Finance",
        "icon": <Icon name={'person-outline'} width={50} height={50} fill={'#969696'}/>
    },{
        "title": "MIS",
        "icon": <Icon name={'person-outline'} width={50} height={50} fill={'#969696'}/>
    }]

    return (
        <Layout style={styles.container}>
            <NavigationBar />
            <View style={styles.listContainer}>
                <FlatList
                    data={data}
                    keyExtractor={ (item, index) => index.toString() }
                    numColumns={2}
                    renderItem={({ item }) => (
                        <ListItem item={item} />
                )}/>
            </View>
        </Layout>
    )
}

const NavigationBar = () => {
    return (
        <View style={styles.toolbar}>
            <Text style={{flex:1}}></Text>
            <TouchableOpacity style={{padding:15}}>
                <Text style={{flex:1,color:'#fff',fontSize:18,fontWeight:'bold'}}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const ListItem = ({item}) => {

    return (
        <TouchableOpacity style={styles.item}>
                {item.icon}
                <Text style={{paddingVertical:10,color:'#313131',fontSize:16,fontWeight:'bold',textAlign:'center'}}>{item.title}</Text>
        </TouchableOpacity>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent: 'center',
        backgroundColor:'blue'
    },
    toolbar: {
        width: '100%',
        backgroundColor:'blue',
        height:55,
        flexDirection:'row'
    },
    item: {
        maxWidth: Dimensions.get('window').width /2,
        flex:0.5,
        height:height/4,
        backgroundColor: '#fff',
        marginBottom: 16,
        marginHorizontal:8,
        borderRadius: 4,
        justifyContent:'center',
        alignItems:'center'
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 25
    }
})