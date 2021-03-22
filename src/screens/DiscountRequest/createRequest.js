import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ImageBackgroundBase, ScrollView } from 'react-native';
import colors from '../../constants/Colors'
import { CheckBox } from '@ui-kitten/components';
import { Text, Select, SelectItem } from '@ui-kitten/components';
import useRequest from '../../hooks/useRequest';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationBar from '../../components/NavigationBar'
import { Picker } from '@react-native-picker/picker';

const CreateRequest = ({ navigation }) => {

    const { makeRequest } = useRequest();

    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [carVariant, setCarVariant] = useState('');
    const [isFinance, setIsFinance] = useState(false);
    const [bankName, setBankName] = useState({});
    const [loanAmount, setLoanAmount] = useState();
    const [isMSIL_Ew, setIsMSIL_Ew] = useState(false);
    const [isR_Ew, setIsR_Ew] = useState(false);
    const [mgaAmount, setMgaAmount] = useState();
    const [actionById, setActionById] = useState();
    const [proposedDiscountAmt, setProposedDiscountAmt] = useState();

    const [selectedIndex, setSelectedIndex] = useState();
    const [allBanks, setAllBanks] = useState([])
    const [banks, setBanks] = useState([])
    const [approvers, setApprovers] = useState([])

    const [showCustNameMsg, setShowCustNameMsg] = useState(false)
    const [showCustPhoneMsg, setShowCustPhoneMsg] = useState(false)
    const [showCarVariantMsg, setShowCarVariantMsg] = useState(false)
    const [showBankNameMsg, setShowBankNameMsg] = useState(false)
    const [showLoanAmtMsg, setShowLoanAmtMsg] = useState(false)
    const [showMGAmtMsg, setShowMGAmtMsg] = useState(false)
    const [showActionIdMsg, setShowActionIdMsg] = useState(false)
    const [showDiscAmtMsg, setShowDiscAmtMsg] = useState(false)

    useEffect(() => {
        makeRequest({
            url: '/banks',
            method: 'GET',
            onSuccess: (res) => {
                const data = res.map(e => e.name)
                setBanks(data)
                makeRequest({
                    url: '/approvers',
                    method: 'GET',
                    onSuccess: (res) => {
                        console.log('res :>> ', res);
                        setApprovers(res)
                    }
                })
            }
        })
    }, []);


    const checkCustomerName = () => {
        setShowCustNameMsg(false)
        if (!customerName) setShowCustNameMsg(true)
        if (customerName.length < 3) setShowCustNameMsg(true)
    }

    const checkCustomerPhone = () => {
        setShowCustPhoneMsg(false)
        if (!Number(customerPhone)) setShowCustPhoneMsg(true)
        if (customerPhone.length != 10) setShowCustPhoneMsg(true)
    }

    const checkCarVariant = () => {
        setShowCarVariantMsg(false)
        if (!carVariant) setShowCarVariantMsg(true)
        if (carVariant.length < 3) setShowCarVariantMsg(true)
    }

    const checkBankName = () => {
        if (isFinance) {
            setShowBankNameMsg(false)
            if (!bankName) setShowBankNameMsg(true)
            if (bankName.length < 3) setShowBankNameMsg(true)
        }
    }

    const checkLoanAmt = () => {
        if (isFinance) {
            setShowLoanAmtMsg(false)
            if (!Number(loanAmount)) setShowLoanAmtMsg(true)
        }
    }

    const checkMGAAmt = () => {
        setShowMGAmtMsg(false)
        if (!Number(mgaAmount)) setShowMGAmtMsg(true)
    }

    const checkActionId = () => {
        setShowActionIdMsg(false)
        if (!actionId) setShowActionIdMsg(true)
    }

    const checkDiscountAmt = () => {
        setShowDiscAmtMsg(false)
        if (!Number(proposedDiscountAmt)) setShowDiscAmtMsg(true)
    }



    const onSubmit = () => {

        checkCustomerName()
        checkCustomerPhone()
        checkCarVariant()
        checkBankName()
        checkLoanAmt()
        checkMgAAmt()
        checkActionId()
        checkDiscountAmt()

        if (showCustNameMsg || showCustPhoneMsg || showCarVariantMsg || showBankNameMsg
            || showLoanAmtMsg || showMGAmtMsg || showActionIdMsg || showDiscAmtMsg)
            return false

        makeRequest({
            url: '/discountRequests',
            method: 'POST',
            body: {
                actionTakenById: actionById,
                customerName,
                customerPhone,
                carVariant,
                isFinance,
                loanAmount,
                isMSILEw: isMSIL_Ew,
                IsREw: isR_Ew,
                accessoriesAmt: mgaAmount,
                proposedDiscountAmount: proposedDiscountAmt,
                bankName
            },
            onSuccess: () => navigation.navigate("ListIndex"),
        })
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <NavigationBar
                title={"CREATE DISCOUNT REQUEST"}
                navigation={navigation}
                goBack
                hide={true}
                style={{ shadowColor: 'gray', elevation: 9, shadowOpacity: 1 }}
            />

            <ScrollView style={styles.formView} showsVerticalScrollIndicator={false}>

                <View style={[styles.inputView,
                { borderBottomColor: (!showCustNameMsg ? "gray" : colors.logoRed) }]}>
                    <Text style={{ marginBottom: 5, fontSize: 18 }}>*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Customer Name"
                        placeholderTextColor={colors.text}
                        onChangeText={text => setCustomerName(text)}
                        defaultValue={customerName}
                        onBlur={checkCustomerName}
                    />
                </View>
                {showCustNameMsg &&
                    <Text style={styles.errorText}>
                        Please enter Customer Name. (2-100 characters).
                    </Text>
                }
                <View style={[styles.inputView,
                { borderBottomColor: (!showCustPhoneMsg ? "gray" : colors.logoRed) }
                ]}>
                    <Text style={{ marginBottom: 5, fontSize: 18 }}>*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Customer Phone"
                        placeholderTextColor={colors.text}
                        onChangeText={text => setCustomerPhone(text)}
                        defaultValue={customerPhone}
                        onBlur={checkCustomerPhone}
                        keyboardType={"phone-pad"}
                    />
                </View>
                {showCustPhoneMsg &&
                    <Text style={styles.errorText}>
                        Please enter a 10-digit mobile number.
                    </Text>
                }
                <View style={[styles.inputView,
                { borderBottomColor: (!showCarVariantMsg ? "gray" : colors.logoRed) }
                ]}>
                    <Text style={{ marginBottom: 5, fontSize: 18 }}>*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Car Variant"
                        placeholderTextColor={colors.text}
                        onChangeText={text => setCarVariant(text)}
                        defaultValue={carVariant}
                        onBlur={checkCarVariant}
                    />
                </View>
                {showCarVariantMsg &&
                    <Text style={styles.errorText}>
                        Please enter a car variant.
                    </Text>
                }
                <View style={[styles.inputView,
                { borderBottomColor: (!showDiscAmtMsg ? "gray" : colors.logoRed) }]
                }>
                    <Text style={{ marginBottom: 5, fontSize: 18 }}>*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Proposed Discount Amount"
                        placeholderTextColor={colors.text}
                        onChangeText={text => setProposedDiscountAmt(text)}
                        defaultValue={proposedDiscountAmt}
                        onBlur={checkDiscountAmt}
                        keyboardType={"number-pad"}
                    />
                </View>
                {showDiscAmtMsg &&
                    <Text style={styles.errorText}>
                        Please enter discount amount.
                </Text>
                }
                <View style={[styles.inputView,
                { borderBottomColor: (!showMGAmtMsg ? "gray" : colors.logoRed) }
                ]}>
                    <Text style={{ marginBottom: 5, fontSize: 18 }}>*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="MGA/NGA Amount"
                        placeholderTextColor={colors.text}
                        onChangeText={text => setMgaAmount(text)}
                        defaultValue={mgaAmount}
                        onBlur={checkMGAAmt}
                        keyboardType={"number-pad"}
                    />
                </View>
                {showMGAmtMsg &&
                    <Text style={styles.errorText}>
                        Please enter a MGA/NGA amount.
                    </Text>
                }
                <View style={[styles.inputView,]}>
                    <Picker
                        selectedValue={actionById}
                        onValueChange={(itemValue, itemIndex) =>
                            setActionById(itemValue)
                        }
                        >
                        {
                            approvers.map((s, i) => {
                                return <Picker.Item key={i} value={s.code} label={s.name} />
                            })
                        }

                    </Picker>
                </View>

                {showActionIdMsg &&
                    <Text style={styles.errorText}>
                        Please select a approver.
                    </Text>
                }
                <View style={styles.checkBoxView}>
                    <CheckBox
                        checked={isMSIL_Ew}
                        onChange={nextChecked => setIsMSIL_Ew(nextChecked)}>
                        <Text style={styles.input}>MSIL-EW?</Text>
                    </CheckBox>

                    <CheckBox
                        style={{ marginLeft: 50 }}
                        checked={isR_Ew}
                        onChange={nextChecked => setIsR_Ew(nextChecked)}>
                        <Text style={styles.input}>R-EW?</Text>
                    </CheckBox>
                </View>

                <View style={styles.checkBoxView}>

                    <CheckBox
                        checked={isFinance}
                        onChange={nextChecked => setIsFinance(nextChecked)}>
                        <Text style={styles.input}>
                            Will customer finance the car?
                    </Text>
                    </CheckBox>
                </View>


                <Picker
                    selectedValue={bankName}
                    onValueChange={(itemValue, itemIndex) =>
                        setBankName(itemValue)
                    }
                    style={styles.inputView}>
                    <Picker.Item
                        label="java" value="java"
                    />
                    {
                        banks.map((s, i) => {
                            return <Picker.Item key={i} value={s} label={s} />
                        })
                    }

                </Picker>

                {
                    showBankNameMsg &&
                    <Text style={styles.errorText}>
                        Please select a Bank Name.
                    </Text>
                }
                <View style={[styles.inputView]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Loan Amount"
                        placeholderTextColor={colors.text}
                        onChangeText={text => setLoanAmount(text)}
                        defaultValue={loanAmount}
                        editable={isFinance}
                        onBlur={checkLoanAmt}
                        keyboardType={"number-pad"}
                    />

                </View>
                {showLoanAmtMsg &&
                    <Text style={styles.errorText}>
                        Please select a loan amount.
                </Text>}
                <View style={{ margin: 10 }} />
            </ScrollView >
            <TouchableOpacity style={{
                padding: 15, alignItems: 'center', width: "100%", backgroundColor: colors.logoBlue, shadowColor: 'gray', shadowOpacity: 0.5, elevation: 6
            }}
                onPress={onSubmit}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>SEND REQUEST</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateRequest

const styles = StyleSheet.create({

    formView: {
        flex: 1,
        marginHorizontal: 25,
        paddingTop: 20
    },
    inputIcon: {
        padding: 10,
    },
    input: {
        color: "#505050",
        fontSize: 16,
        marginHorizontal: 5,
    },
    inputView: {
        //borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBoxView: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    errorText: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.logoRed,
        marginBottom: 20
    }

})