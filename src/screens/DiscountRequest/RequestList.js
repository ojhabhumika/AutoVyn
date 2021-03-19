import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/Colors'
import LottieView from 'lottie-react-native';
import { parseISO, isToday, isYesterday } from 'date-fns'
import { Text } from '@ui-kitten/components';

const RequestList = ({ discountReqList, userNames, loading, setLoading }) => {

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
    }, []);

    // useEffect(() => {
    //     if (groupedList.length > 0 || discountReqList.length == 0) {
           
    //     }
    // }, [groupedList]);

    return (
        <>
            { loading ?
               
                <Text>Loading...</Text>
                :
                <ScrollView contentContainerStyle={{
                    backgroundColor: "#F8F6F6",
                    justifyContent: "center", alignItems: "center"
                }}>
                    {
                        groupedList.map(data => {
                            return (
                                <>
                                    {data.list.length > 0 &&
                                        <>
                                            <View style={styles.headerDiv}>
                                                <Text style={styles.headingText}>
                                                    {data.title}&nbsp;&nbsp;
                                                </Text>
                                            </View>
                                            {
                                                data.list.map(e => <RequestCard
                                                    key={Math.random()}
                                                    requestData={e}
                                                    bank={bankNames.find(bank => bank.code == e.bankId)}
                                                    user={userNames.find(user => user.code == e.discountRaisedById)}
                                                />)
                                            }
                                        </>
                                    }
                                </>
                            )

                        })
                    }
                </ScrollView>
            }
        </>
    )
}

const RequestCard = ({ requestData, bank, user }) => {

    const { IsREw, isMSILEw, accessoriesAmt, allowedDiscount, carVariant, customerName, customerPhone,
        isFinance, proposedDiscountAmount, loanAmount, reqId, status, bankName } = requestData

    const getLightColor = status == null
        ? colors.lightBlue
        : (status == true ? colors.lightGreen : colors.lightRed)

    return (
        <Pressable
            onPress={() => {
                console.log("Long Press")
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
                    <View style={styles.mainDiv}>
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
        </Pressable >
    )
}

export default RequestList


const styles = StyleSheet.create({

    cardbg: {
        width: "92%",
        flexDirection: "column",
        paddingVertical: 15,
        borderLeftWidth: 5,
        borderLeftColor: "#006400",
        borderRightColor: "#C0C0C0",
        borderTopColor: "#C0C0C0",
        borderBottomColor: "#C0C0C0",
        borderBottomWidth: 2,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTopRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10,
        paddingLeft: 10,
    },
    cardRow: {
        paddingLeft: 20,
        color: "black",
        flexDirection: "row",
        marginVertical: 5,
        alignItems: "center"
    },
    cardText: {
        color: colors.text,
        fontSize: 18,
        paddingLeft: 10
    },
    cardTopText: {
        fontSize: 20,
        paddingLeft: 10,
        fontWeight: "bold",
    },
    amountText: {
        fontSize: 21,
        color: colors.red,
        fontWeight: "bold",
        paddingVertical: 5,
        paddingLeft: 20,
        paddingRight: 10
    },
    amountTextDiv: {
        borderColor: '#C0C0C0',
        borderStyle: 'dashed',
        borderWidth: 1.5,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        backgroundColor: "#F8F6F6",
        marginLeft: "auto"
    },
    mainDiv: {
        flexDirection: "column",
    },
    headerDiv: {
        width: "92%",
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 25,
        paddingBottom: 15
    },
    headingText: {
        color: colors.text,
        fontSize: 20,
        textAlign: 'left'
    },
    divider: {
        flex: 1, height: 1, backgroundColor: '#808080'
    }
});
