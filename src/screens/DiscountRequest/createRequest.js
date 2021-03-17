import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/Colors'
import LottieView from 'lottie-react-native';

const CreateRequest = () => {

    const [customerName, setCustomerName] = useState('');
    const [customerPhome, setCustomerPhone] = useState('');
    const [carVariant, setCarVariant] = useState('');
    const [isFinance, setIsFinance] = useState(false);
    const [bankId, setBankId] = useState();
    const [loanAmount, setLoanAmount] = useState();
    const [isMSIL_Ew, setIsMSIL_Ew] = useState();
    const [isR_Ew, setIsR_Ew] = useState();
    const [mgaAmount, setMgaAmount] = useState();
    const [actionById, setActionById] = useState();
    const [proposedDiscountAmt, setProposedDiscountAmt] = useState();

    return (
        <LottieView
            source={require('../../../assets/lottie/Loading_Car.json')}
            colorFilters={[{
                keypath: "button",
                color: "#F00000"
            }, {
                keypath: "Sending Loader",
                color: "#F00000"
            }]}
            autoPlay
            loop
            resizeMode='cover'
        />
    )

    // return (
    //     <View style={styles.cardbg}>

    //         <View style={styles.inputCard}>
    //             <TextInput
    //                 style={styles.input}
    //                 placeholder="Enter Customer Name*"
    //                 placeholderTextColor={colors.text}
    //                 onChangeText={text => setCustomerName(text)}
    //                 defaultValue={customerName}
    //                 underlineColorAndroid="transparent"
    //             />

    //             <TextInput
    //                 style={styles.input}
    //                 placeholder="Enter Customer Phone*"
    //                 placeholderTextColor={colors.text}
    //                 onChangeText={text => setCustomerPhone(text)}
    //                 defaultValue={customerPhome}
    //                 underlineColorAndroid="transparent"
    //                 keyboardType={"phone-pad"}
    //             />
    //         </View>

    //         <View style={styles.inputCard}>
    //             <TextInput
    //                 style={styles.input}
    //                 placeholder="Enter Car Variant"
    //                 placeholderTextColor={colors.text}
    //                 onChangeText={text => setCarVariant(text)}
    //                 defaultValue={carVariant}
    //                 underlineColorAndroid="transparent"
    //             />
    //         </View>


    //         <View style={styles.inputCard}>

    //             <Text>Will customer finance the car?</Text>

    //             <TextInput
    //                 style={styles.input}
    //                 placeholder="Select Bank"
    //                 placeholderTextColor={colors.text}
    //                 onChangeText={text => setLoanAmount(text)}
    //                 defaultValue={loanAmount}
    //                 editable={isFinance}
    //                 underlineColorAndroid="transparent"
    //             />

    //             <TextInput
    //                 style={styles.input}
    //                 placeholder="Enter Loan Amount"
    //                 placeholderTextColor={colors.text}
    //                 onChangeText={text => setLoanAmount(text)}
    //                 defaultValue={loanAmount}
    //                 editable={isFinance}
    //                 underlineColorAndroid="transparent"
    //                 keyboardType={"decimal-pad"}
    //             />

    //         </View>

    //         <TextInput
    //             style={styles.input}
    //             placeholder="Enter MGA/NGA Amount"
    //             placeholderTextColor={colors.text}
    //             onChangeText={text => setMgaAmount(text)}
    //             defaultValue={mgaAmount}
    //             underlineColorAndroid="transparent"
    //             keyboardType={"decimal-pad"}
    //         />
    //         <TextInput
    //             style={styles.input}
    //             placeholder="Enter Proposed Discount Amount"
    //             placeholderTextColor={colors.text}
    //             onChangeText={text => setProposedDiscountAmt(text)}
    //             defaultValue={proposedDiscountAmt}
    //             underlineColorAndroid="transparent"
    //             keyboardType={"decimal-pad"}
    //         />

    //     </View>
    // )
}

export default CreateRequest

const styles = StyleSheet.create({

    cardbg: {
        width: "100%",
        flexDirection: "column",
        //paddingVertical: 15,
        marginBottom: 10,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    },
    inputCard: {
        //width: "100%",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 15,
        marginVertical: 10
    },
    inputIcon: {
        padding: 10,
    },
    input: {
        width: "94%",
        fontSize: 18,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: '#808080',
        borderColor: "#808080",
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 5
    },
})