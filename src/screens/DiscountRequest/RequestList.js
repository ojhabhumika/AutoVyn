import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/Colors'
import { parseISO, isToday, isYesterday } from 'date-fns'
import Loading from '../../components/Loading'
import ActionModal from './_ReqActionModal'
import { TouchableOpacity } from 'react-native-gesture-handler';

const RequestList = ({ filteredList, userNames, loading, setLoading, selectedIndex }) => {

    const [groupedList, setGroupedList] = useState([])
    const [groupLoading, setGroupLoading] = useState(true)

    useEffect(() => {
        setGroupedList([])
        if (filteredList.length > 0) {
            const groupBy = [{
                title: "TODAY",
                list: filteredList.filter(x => isToday(parseISO(x.createdAt)))
            },
            {
                title: "YESTERDAY",
                list: filteredList.filter(x => isYesterday(parseISO(x.createdAt)))
            },
            {
                title: "OLDER",
                list: filteredList.filter(x => !isToday(parseISO(x.createdAt)) && !isYesterday(parseISO(x.createdAt)))
            }]
            setGroupedList(groupBy)
            setLoading(false)
        }
        setGroupLoading(false)
    }, [selectedIndex, filteredList]);

    useEffect(() => {
        if (groupedList.length > 0) setLoading(false)
    }, [groupedList])

    if (loading) return <Loading />

    return (
        <View style={{ flex: 1 }}>
            { !groupLoading &&
                <ScrollView style={{ flex: 1, paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
                    {
                        groupedList.length > 0 ?
                            (
                                groupedList.map(data => {
                                    return (
                                        <>
                                            {data.list.length > 0 &&
                                                <>
                                                    <Text style={styles.headingText}>{data.title}</Text>
                                                    {
                                                        data.list.map(e => <RequestCard
                                                            key={e.reqId}
                                                            requestData={e}
                                                            user={userNames.find(user => user.code == e.discountRaisedById)}
                                                        />)
                                                    }
                                                </>
                                            }
                                        </>
                                    )

                                })
                            )
                            :
                            <Text style={{
                                fontSize: 20,
                                alignSelf: "center",
                                paddingTop: 15
                            }}>No Requests.</Text>
                    }
                    <View style={{ marginBottom: 20 }} />
                </ScrollView>
            }
        </View>
    )
}

const RequestCard = ({ requestData, user }) => {

    const { IsREw, isMSILEw, accessoriesAmt, allowedDiscount, carVariant, customerName, customerPhone,
        isFinance, proposedDiscountAmount, loanAmount, reqId, status, bankName } = requestData

    const [showModal, setShowModal] = useState(false)

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.cardbg,
            {
                borderLeftColor: (status == null)
                    ? colors.logoBlue
                    : (status == true ? colors.green : colors.logoRed)
            }]}
        >
            <>
                <View style={{ ...styles.cardTopRow }}>
                    <View style={{ marginLeft: 2 }}>
                        <Text style={styles.cardTopText}>#{reqId}</Text>
                        <Text style={styles.cardTopText}>{user?.userName}</Text>
                    </View>
                    <View style={styles.amountTextDiv}>
                        <Text style={styles.amountText} >₹{proposedDiscountAmount} </Text>
                    </View>
                </View>

                <View style={styles.cardRow}>
                    <Icon name="person-circle-outline" size={25} color={colors.icon} />
                    <Text style={styles.cardText}>
                        {customerName}, {customerPhone}
                    </Text>
                </View>
                <View style={styles.cardRow}>
                    <Icon name="car-outline" size={25} color={colors.icon} />
                    <Text style={styles.cardText}>
                        {carVariant}
                    </Text>
                </View>
                {isFinance &&
                    <View style={styles.cardRow}>
                        <Icon name="cash-outline" size={25} color={colors.icon} />
                        <Text style={styles.cardText}>
                            {bankName}, ₹{loanAmount ?? 0}
                        </Text>
                    </View>
                }
                <View style={styles.cardRow}>
                    <Icon name="settings-outline" size={25} color={colors.icon} />
                    <Text style={styles.cardText}>
                        {isMSILEw && "MSILEW |"} {IsREw && "REW | "}MGA/NGA ₹{accessoriesAmt}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setShowModal(true)}>
                        <Icon name="checkmark-circle" size={35} color={'#65BDF2'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { setShowModal(true) }}>
                        <Icon name="close-circle" size={35} color={'#65BDF2'} style={{ marginHorizontal: 15 }} />
                    </TouchableOpacity>
                </View>
            </>
            < ActionModal reqId={reqId} status={status} hide={() => setShowModal(false)} show={showModal} />
        </TouchableOpacity >
    )
}

export default RequestList


const styles = StyleSheet.create({

    cardbg: {
        marginHorizontal: 15,
        marginTop: 8,
        paddingVertical: 15,
        paddingLeft: 15,
        borderLeftWidth: 5,
        borderLeftColor: "#006400",
        marginBottom: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        shadowColor: "gray",
        shadowOpacity: 0.5,
        elevation: 5,
        backgroundColor: '#fff'
    },
    cardTopRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },
    cardRow: {
        flexDirection: "row",
        marginVertical: 3,
        alignItems: "center"
    },
    cardText: {
        flex: 1,
        color: 'gray',
        fontSize: 16,
        paddingLeft: 10
    },
    cardTopText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    amountText: {
        fontSize: 20,
        color: colors.red,
        fontWeight: "bold",
        paddingVertical: 6,
        paddingHorizontal: 20
    },
    amountTextDiv: {
        borderColor: '#C0C0C0',
        borderStyle: 'dashed',
        borderWidth: 1.5,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        backgroundColor: "#F8F6F6",
        marginLeft: "auto",
        // borderRightWidth: 0,
        // borderStyle: 'dashed',
    },
    headingText: {
        color: colors.text,
        fontSize: 18,
        textAlign: 'left',
        paddingLeft: 15,
        marginTop: 15,
        marginBottom: 5
    }
});
