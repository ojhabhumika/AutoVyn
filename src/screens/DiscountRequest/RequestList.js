import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/Colors'
import { parseISO, isToday, isYesterday } from 'date-fns'
import { Text } from '@ui-kitten/components';
import Loading from '../../components/Loading'
import ActionModal from './_ReqActionModal'

const RequestList = ({ discountReqList, userNames, loading, bankNames, setLoading, selectedIndex }) => {

    const [groupedList, setGroupedList] = useState([])

    useEffect(() => {
        //setLoading(true)
        if (discountReqList.length > 0) {
            const groupBy = [{
                title: "TODAY",
                list: discountReqList.filter(x => isToday(parseISO(x.createdAt)))
            },
            {
                title: "YESTERDAY",
                list: discountReqList.filter(x => isYesterday(parseISO(x.createdAt)))
            },
            {
                title: "OLDER",
                list: discountReqList.filter(x => !isToday(parseISO(x.createdAt)) && !isYesterday(parseISO(x.createdAt)))
            }]
            setGroupedList(groupBy)
            setLoading(false)
        }
    }, [selectedIndex, discountReqList]);

    // useEffect(() => {
    //     if (groupedList.length > 0 || discountReqList.length == 0) {
           
    //     }
    // }, [groupedList]);

    return (
        <View style={{flex:1}}>
            { loading ?
                <Loading />
                :
                <ScrollView style={{ flex:1,paddingVertical:10}} showsVerticalScrollIndicator={false}>
                    {
                        groupedList.map(data => {
                            return (
                                <>
                                    {data.list.length > 0 &&
                                        <>
                                                <Text style={styles.headingText}>{data.title}</Text>
                                            {
                                                data.list.map(e => <RequestCard
                                                    key={Math.random()}
                                                    requestData={e}
                                                    // bank={bankNames.find(bank => bank.code == e.bankId)}
                                                    user={userNames.find(user => user.code == e.discountRaisedById)}
                                                />)
                                            }
                                        </>
                                    }
                                </>
                            )

                        })
                    }
                    <View style={{ marginBottom:20 }}/>
                </ScrollView>
            }
        </View>
    )
}

const RequestCard = ({ requestData, bank, user }) => {

    const { IsREw, isMSILEw, accessoriesAmt, allowedDiscount, carVariant, customerName, customerPhone,
        isFinance, proposedDiscountAmount, loanAmount, reqId, status, bankName } = requestData

        const [showModal, setShowModal] = useState(false)

    const getLightColor = status == null
        ? colors.lightBlue
        : (status == true ? colors.lightGreen : colors.lightRed)

    return (
        <Pressable
            onPress={() => {
               setShowModal(true) 
            }}
            style={({ pressed }) => [
                styles.cardbg,
                {
                    backgroundColor: pressed
                        ? getLightColor
                        : '#FFF',
                },
                {
                    borderLeftColor: (status == null)
                        ? colors.logoBlue
                        : (status == true ? colors.green : colors.logoRed)

                    //   Processing  : blue 
                    //   Accepted    : green
                    //   Rejected    : red
                }
            ]}
            android_ripple={{ color: getLightColor, borderless: false }}
        >
            <>
                <View style={{ ...styles.cardTopRow }}>
                    <View style={{marginLeft:2}}>
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
                </View>
            </>
            < ActionModal reqId={reqId} status={status}  hide={() => setShowModal(false)} show={showModal}/>
        </Pressable >
    )
}

export default RequestList


const styles = StyleSheet.create({

    cardbg: {
        marginHorizontal:15,
        marginTop:8,
        paddingVertical: 15,
        paddingLeft:15,
        borderLeftWidth: 5,
        borderLeftColor: "#006400",
        marginBottom: 10,
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        shadowColor: "gray",
        shadowOpacity: 0.5,
        elevation: 5,
    },
    cardTopRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom:5
    },
    cardRow: {
        flexDirection: "row",
        marginVertical: 3,
        alignItems: "center"
    },
    cardText: {
        flex:1,
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
        paddingVertical:6,
        paddingHorizontal:20
    },
    amountTextDiv: {
        borderColor: '#C0C0C0',
        borderStyle: 'dashed',
        borderWidth: 1.5,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        backgroundColor: "#F8F6F6",
        marginLeft: "auto",
    },
    headingText: {
        color: colors.text,
        fontSize: 18,
        textAlign: 'left',
        paddingLeft: 15
    }
});
