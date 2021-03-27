import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
import useRequest from '../../hooks/useRequest';
import colors from '../../constants/Colors'
import { Button, ButtonGroup, Modal } from '@ui-kitten/components';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActionModal = ({ show, hide, reqId, proposedAmt, isAccept, discountReqList, setDiscountReqList }) => {

    const { makeRequest } = useRequest();

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

            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onBackdropPress={resetModal} >
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', width: width }}>
                <View style={{ padding: 15, flex: 1 }}>

                    <Text style={{ marginHorizontal: 15, fontSize: 20 }}>
                        Request-Id #{reqId}
                    </Text>
                    <TouchableOpacity
                        onPress={resetModal}
                        style={{ position: 'absolute', right: 15, top: 15 }}
                        activeOpacity={0.8}>
                        <Icon name="close" color={'gray'} size={30} />
                    </TouchableOpacity>

                    {

                        isAccept &&
                        <>
                            {/* <Text style={{
                                marginHorizontal: 10,
                                color: '#313131', marginTop: 30,
                                marginBottom: 8
                            }}>Allowed discount should be less than {proposedAmt} </Text> */}
                            <View style={{ flexDirection: "row", borderBottonWidth: 2, borderBottomColor: "#000" }}>
                                <TextInput
                                    style={[styles.input]}
                                    placeholder="Allowed Discount Amount"
                                    placeholderTextColor={colors.text}
                                    focusable={true}
                                    onChangeText={text => setDiscount(Number(text) ?? 0)}
                                    value={`${discount ?? 0}`}
                                    defaultValue={`${proposedAmt ?? 0}`}
                                    onBlur={checkDiscount}
                                    keyboardType={"number-pad"}
                                />

                                {/* <ButtonGroup status='basic' style={{ marginLeft: "auto" }}>
            <Button
                onPress={() => setDiscount(prev => prev + 500)}
                disabled={discount >= proposedAmt}>+
            </Button>
            <Button
                onPress={() => setDiscount(prev => prev - 500)}
                disabled={discount <= 0}>-
            </Button>
        </ButtonGroup> */}
                            </View>
                        </>}

                    {
                        !isDiscountValid &&
                        (discount > proposedAmt ? <Text style={{ marginHorizontal: 10, color: 'red' }}>Allowed discount should be less than ${proposedAmt} </Text> : <Text style={{ marginHorizontal: 10, color: 'red' }}>Invalid value</Text>)
                    }

                    <TextInput
                        style={[styles.input, {
                            minHeight: 100,
                            marginTop: 20,
                            borderWidth: 0.5,
                        }]}
                        placeholder="Enter remarks (optional)"
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
                        style={{ padding: 15, backgroundColor: '#65BDF2', flex: 1 }}
                    >
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>DONE</Text>
                    </TouchableOpacity>
                </View>

            </View >

        </Modal>
    );
}

export default ActionModal;

const styles = StyleSheet.create({

    input: {
        color: "#505050",
        fontSize: 16,
        margin: 10,
        flex: 1,
        borderRadius: 5
    },

})