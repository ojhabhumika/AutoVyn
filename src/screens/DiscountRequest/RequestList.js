import React, { useState, useEffect, Fragment } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/Colors'
import { parseISO, isToday, isYesterday } from 'date-fns'
import Loading from '../../components/Loading'
import ActionModal from './_ReqActionModal'
import { TouchableOpacity } from 'react-native-gesture-handler';

const RequestList = ({ filteredList, userNames, loading, setLoading,
    selectedIndex, canUserApproveReq }) => {

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
                                        <Fragment key={data.title}>
                                            {data.list.length > 0 &&
                                                <>
                                                    <Text style={styles.headingText}>{data.title}</Text>
                                                    {
                                                        data.list.map(e => <RequestCard
                                                            key={e.reqId}
                                                            requestData={e}
                                                            user={userNames.find(user => user.code == e.discountRaisedById)}
                                                            canUserApproveReq={canUserApproveReq}
                                                        />)
                                                    }
                                                </>
                                            }
                                        </Fragment>
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

const RequestCard = ({ requestData, user, canUserApproveReq }) => {

    const { IsREw, isMSILEw, accessoriesAmt, allowedDiscount, carVariant, customerName, customerPhone,
        isFinance, proposedDiscountAmount, loanAmount, reqId, status, bankName, remarks } = requestData

    const [showModal, setShowModal] = useState(false)
    const [isAccept, setIsAccept] = useState(false)
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

                </View>
                {
                    status === true &&
                    <View style={styles.cardRow}>
                        <Icon name="checkmark" size={25} color={'#339989'} />
                        <Text style={styles.cardText}>
                            Allowed Amount ₹{allowedDiscount}
                            {remarks && <>{"\n"} {remarks}</>}
                        </Text>
                    </View>
                }

                {
                    status === false && Boolean(remarks) &&
                    <View style={styles.cardRow}>
                        <Icon name="close" size={25} color={'#ef5350'} />
                        <Text style={styles.cardText}>
                            {remarks}
                        </Text>
                    </View>
                }

                {
                    !canUserApproveReq && status == null &&
                    <View style={styles.actionRow}>

                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: "#e7f7f5" }]}
                            activeOpacity={0.8}
                            onPress={() => {
                                setIsAccept(true)
                                setShowModal(true)
                            }}>
                            <Icon name="checkmark" size={25} color={'#339989'} />
                            <Text style={[styles.actionText, { color: "#339989" }]}>Accept</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: "#ffebee" }]}
                            activeOpacity={0.8}
                            onPress={() => {
                                setIsAccept(false)
                                setShowModal(true)
                            }}>
                            <Icon name="close" size={25} color={'#ef5350'} />
                            <Text style={[styles.actionText, { color: "#ef5350" }]}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                }
            </>
            <ActionModal
                reqId={reqId}
                proposedAmt={proposedDiscountAmount}
                show={showModal}
                hide={() => setShowModal(false)}
                isAccept={isAccept}
            />
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
    },
    actionRow: {
        flexDirection: "row-reverse",
        marginTop: 15,
        alignItems: "center",
        marginLeft: 20
    },
    actionButton: {
        flexDirection: "row",
        borderColor: "#fff",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderLeftWidth: 5
    },
    actionText: {
        fontSize: 18,
        marginHorizontal: 5,
        fontWeight: "bold",
    }

});
