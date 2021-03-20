import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import useRequest from '../../hooks/useRequest';
import colors from '../../constants/Colors'
import { Text, Button, ButtonGroup } from '@ui-kitten/components';

const ActionModal = ({ reqId, status, proposedAmt = 5000 }) => {

    const { makeRequest } = useRequest();

    const [discount, setDiscount] = useState(proposedAmt);
    const [remarks, setRemarks] = useState("");

    const [isDiscountValid, setIsDiscountValid] = useState(true)

    const checkDiscount = () => {
        setIsDiscountValid(true)
        if (!parseInt(discount) || discount >= proposedAmt || discount < 0) setIsDiscountValid(false)
    }

    const onSubmit = () => {

        checkDiscount()
        if (!isDiscountValid) return false

        makeRequest({
            url: `/discountRequests${reqId}`,
            method: 'PUT',
            body: {
                status, allowedDiscount: discount, remarks
            },
            onSuccess: (res) => {
                // reload page
            },
            onFailure: () => setLoading(false)
        })
    }

    return (
        <View style={{ flex: 1, margin: 30 }}>

            {
                status != true &&
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Allowed Discount Amount"
                        placeholderTextColor={colors.text}
                        onChangeText={text => setDiscount(Number(text) ?? 0)}
                        value={`${discount ?? 0}`}
                        defaultValue={`${discount ?? 0}`}
                        onBlur={checkDiscount}
                        keyboardType={"number-pad"}
                    />

                    <ButtonGroup status='basic' style={{ marginLeft: "auto" }}>
                        <Button
                            onPress={() => setDiscount(prev => prev + 500)}
                            disabled={discount >= proposedAmt}>+
                        </Button>
                        <Button
                            onPress={() => setDiscount(prev => prev - 500)}
                            disabled={discount <= 0}>-
                        </Button>
                    </ButtonGroup>
                </View>
            }

            {
                !isDiscountValid &&
                (discount > proposedAmt ? <Text>Allowed discount should be less than ${proposedAmt} </Text> : <Text>Invalid value</Text>)
            }

            <TextInput
                style={styles.input}
                placeholder="Remarks"
                placeholderTextColor={colors.text}
                onChangeText={text => setRemarks(text)}
                defaultValue={remarks}
                multiline={true}
                underlineColorAndroid="transparent"
            />

            <TouchableOpacity
                onPress={onSubmit}
                activeOpacity={0.8}
                style={{ margin: 10 }}
            >
                <Text>SAVE</Text>
            </TouchableOpacity>

        </View >
    );
}

export default ActionModal;

const styles = StyleSheet.create({

    input: {
        color: "#505050",
        fontSize: 18,
        marginHorizontal: 5,
    },

})