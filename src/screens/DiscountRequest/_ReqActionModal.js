import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import useRequest from '../../hooks/useRequest';
import colors from '../../constants/Colors'
import { Text, Button, ButtonGroup, Modal, Icon } from '@ui-kitten/components';

const ActionModal = ({ show, hide, reqId, status, proposedAmt = 5000 }) => {

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
        <Modal
        visible={show}
            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onBackdropPress={hide} >
            <View style={{ padding: 15,backgroundColor:'#fff',borderRadius:6,shadowColor:'gray', elevation:6 }}>
            <TouchableOpacity
                onPress={hide}
                style={{position:'absolute',right:15,top:15}}
                activeOpacity={0.8}>
            <Icon name="close-outline" fill={'gray'} width={30} height={30} />
            </TouchableOpacity>
            <Text style={{marginHorizontal:10, color:'313131',marginTop:50,marginBottom:20}}>Allowed discount should be less than {proposedAmt} </Text>
{
    
    status != true &&
    
    <View style={{ flexDirection: "row" }}>
        <TextInput
            style={styles.input}
            placeholder="Allowed Discount Amount"
            placeholderTextColor={colors.text}
            focusable={true}
            onChangeText={text => setDiscount(Number(text) ?? 0)}
            value={`${discount ?? 0}`}
            defaultValue={`${discount ?? 0}`}
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
}

{
    !isDiscountValid &&
    (discount > proposedAmt ? <Text style={{marginHorizontal:10, color:'red'}}>Allowed discount should be less than ${proposedAmt} </Text> : <Text style={{marginHorizontal:10, color:'red'}}>Invalid value</Text>)
}

<TextInput
    style={styles.input}
    placeholder="Enter remarks (optional)"
    placeholderTextColor={colors.text}
    onChangeText={text => setRemarks(text)}
    defaultValue={remarks}
    multiline={true}
    underlineColorAndroid="transparent"
/>

<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:10}}>
<TouchableOpacity
    onPress={onSubmit}
    activeOpacity={0.8}
    style={{ margin: 10,padding:12,backgroundColor:'#65BDF2',width:'40%',borderRadius:24 }}
>
    <Text style={{color:'#fff', fontSize:18,fontWeight:'bold',textAlign:'center'}}>SAVE</Text>
</TouchableOpacity>
{/* <TouchableOpacity
    onPress={onSubmit}
    activeOpacity={0.8}
    style={{ margin: 10, padding:12,backgroundColor:'red',width:'40%',borderRadius:24 }}
>
    <Text style={{color:'#fff', fontSize:18,fontWeight:'bold',textAlign:'center'}}>Reject</Text>
</TouchableOpacity> */}
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
        margin:10,
        borderWidth:0.5,
        flex:1,
        borderRadius:5
    },

})