import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Dimensions, Modal, ToastAndroid } from 'react-native';
import useRequest from '../../hooks/useRequest';
import colors from '../../constants/Colors'
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DiscountContext from '../../context/DiscountContext'

const ActionModal = ({ show, hide, reqId, proposedAmt, isAccept }) => {

    const { makeRequest } = useRequest();
    const { discountReqList, setDiscountReqList } = useContext(DiscountContext)
    const [discount, setDiscount] = useState(proposedAmt);
    const [remarks, setRemarks] = useState("");

    const [isDiscountValid, setIsDiscountValid] = useState(true)

    const checkDiscount = () => {
        setIsDiscountValid(true)
        if (!parseInt(discount) || discount >= proposedAmt || discount < 0) setIsDiscountValid(false)
    }

    const onSubmit = () => {
        if (isAccept) {
            checkDiscount()
            if (!isDiscountValid) return false
        }

        makeRequest({
            url: `/discountRequests/${reqId}`,
            method: 'PUT',
            body: {
                status: isAccept, allowedDiscount: discount, remarks
            },
            onSuccess: (res) => {
                discountReqList.find(x => x.reqId == reqId).status = isAccept
                discountReqList.find(x => x.reqId == reqId).remarks = remarks
                discountReqList.find(x => x.reqId == reqId).allowedDiscount = discount
                setDiscountReqList([...discountReqList])
                let message = isAccept ? "Request Accepted!" : "Request Rejected!"
                ToastAndroid.show(message, ToastAndroid.SHORT)
            },
            onFailure: () => {
                hide()
                ToastAndroid.show("Error occured", ToastAndroid.SHORT)
            }
        })
    }

    const resetModal = () => {
        setDiscount(proposedAmt)
        setIsDiscountValid(true)
        hide()
    }

    return (
        <Modal
            visible={show}
            style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: 0, top: '50%' }}
            transparent={true}
            onBackdropPress={resetModal} >
            <TouchableOpacity
                onPress={resetModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', flex: 1 }}>
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', width: width }}>
                    <View style={{ padding: 15, flex: 1 }}>

                        <View style={{ marginVertical: 10 }}>
                            <TouchableOpacity
                                onPress={resetModal}
                                style={{ position: 'absolute', right: 15 }}
                                activeOpacity={0.8}>
                                <Icon name="close" color={'gray'} size={30} />
                            </TouchableOpacity>
                            <Text style={{ marginHorizontal: 10, color: '#000', fontSize: 20, fontWeight: 'bold' }}>
                                Request Id #{reqId}
                            </Text>
                        </View>

                        {

                            isAccept &&

                            <>
                                <Text style={{ marginHorizontal: 10, marginTop: 15, color: "#696969", fontSize: 17, }}>
                                    Enter Allowed Discount
                                 </Text>
                                <View style={{ flexDirection: "row", borderBottonWidth: 2, borderBottomColor: "#000" }}>
                                    <TextInput
                                        style={[styles.input]}
                                        placeholder="Allowed Discount Amount"
                                        placeholderTextColor={colors.text}
                                        focusable={true}
                                        onChangeText={text => setDiscount(Number(text) ?? 0)}
                                        value={discount}
                                        defaultValue={`${proposedAmt}`}
                                        onBlur={checkDiscount}
                                        keyboardType={"number-pad"}
                                    />

                                </View>
                            </>}

                        {
                            !isDiscountValid &&
                            (discount > proposedAmt ?
                                <Text style={{ marginHorizontal: 10, marginBottom: 10, color: 'red' }}>Allowed discount should be less than ₹{proposedAmt} </Text>
                                : <Text style={{ marginHorizontal: 10, marginBottom: 10, color: 'red' }}>Invalid value</Text>)
                        }

                        <TextInput
                            style={[{
                                minHeight: 100,
                                marginTop: 20,
                                borderRadius: 5,
                                borderColor: 'gray',
                                borderWidth: 0.5,
                                color: "#505050",
                                fontSize: 17,
                                margin: 10,
                                flex: 1,
                                paddingHorizontal: 10
                            }]}
                            placeholder="Enter Remarks (Optional)"
                            placeholderTextColor={colors.text}
                            onChangeText={text => setRemarks(text)}
                            defaultValue={remarks}
                            multiline={true}
                            underlineColorAndroid="transparent"
                            textAlignVertical={'top'}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={onSubmit}
                            activeOpacity={0.8}
                            style={{
                                padding: 15,
                                backgroundColor: '#65BDF2',
                                flex: 1
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>DONE</Text>
                        </TouchableOpacity>
                    </View>

                </View >
            </TouchableOpacity>
        </Modal>
    );
}

export default ActionModal;

const styles = StyleSheet.create({

    input: {
        color: "#505050",
        fontSize: 16,
        marginBottom: 10,
        marginHorizontal: 10,
        flex: 1,
        borderRadius: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5
    },

})