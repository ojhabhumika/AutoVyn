import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import colors from '../../constants/Colors'
import useRequest from '../../hooks/useRequest';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateRequest = ({ navigation }) => {

    const { makeRequest } = useRequest();

    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [carVariant, setCarVariant] = useState('');
    const [isFinance, setIsFinance] = useState(false);
    const [bankName, setBankName] = useState();
    const [loanAmount, setLoanAmount] = useState();
    const [isMSIL_Ew, setIsMSIL_Ew] = useState(false);
    const [isR_Ew, setIsR_Ew] = useState(false);
    const [mgaAmount, setMgaAmount] = useState();
    const [actionById, setActionById] = useState();
    const [proposedDiscountAmt, setProposedDiscountAmt] = useState();

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
            }
        })

        makeRequest({
            url: '/approvers',
            method: 'GET',
            onSuccess: (res) => setApprovers(res)
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
            if (bankName?.length < 3) setShowBankNameMsg(true)
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
        if (!actionById) setShowActionIdMsg(true)
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
        checkMGAAmt()
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
            onSuccess: () => navigation.push("ListIndex"),
        })
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={styles.navBar}>

                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push("ListIndex")}>
                    <Icon name='arrow-left' size={30} color={colors.text} style={{ marginLeft: 15 }} />
                </TouchableOpacity>

                <Text style={styles.navTitle}>CREATE DISCOUNT REQUEST</Text>
            </View>

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
                        Please enter a valid MGA/NGA amount.
                    </Text>
                }

                <View style={[styles.checkBoxView, { marginTop: 20 }]}>
                    {/* <CheckBox
                        checked={isMSIL_Ew}
                        onChange={nextChecked => setIsMSIL_Ew(nextChecked)}>
                        <Text style={styles.input}>MSIL-EW?</Text>
                    </CheckBox> */}
                    <TouchableOpacity
                        onPress={() => setIsMSIL_Ew(!isMSIL_Ew)}
                        activeOpacity={1}
                    >
                        <>
                            {
                                !isMSIL_Ew ?
                                    <Icon name={"checkbox-blank-outline"} size={30} color={"#3D3D3D"} /> :
                                    <Icon name={"checkbox-marked-outline"} size={30} color={"#3D3D3D"} />
                            }
                            <Text style={styles.input}>MSIL-EW?</Text>
                        </>
                    </TouchableOpacity>

                    {/* <CheckBox
                        style={{ marginLeft: 50 }}
                        checked={isR_Ew}
                        onChange={nextChecked => setIsR_Ew(nextChecked)}>
                        <Text style={styles.input}>R-EW?</Text>
                    </CheckBox> */}

                    <TouchableOpacity
                        onPress={() => setIsR_Ew(!isR_Ew)}
                        activeOpacity={1}
                    >
                        <>
                            {
                                !isR_Ew ?
                                    <Icon name={"checkbox-blank-outline"} size={30} color={"#3D3D3D"} /> :
                                    <Icon name={"checkbox-marked-outline"} size={30} color={"#3D3D3D"} />
                            }
                            <Text style={styles.input}>R-EW?</Text>
                        </>
                    </TouchableOpacity>
                </View>

                <View style={[styles.checkBoxView, { marginBottom: 20 }]}>

                    {/* <CheckBox
                        checked={isFinance}
                        onChange={nextChecked => setIsFinance(nextChecked)}>
                        <Text style={styles.input}>
                            Will customer finance the car?
                    </Text>
                    </CheckBox> */}
                    <TouchableOpacity
                        onPress={() => setIsFinance(!isFinance)}
                        activeOpacity={1}
                    >
                        <>
                            {
                                !isFinance ?
                                    <Icon name={"checkbox-blank-outline"} size={30} color={"#3D3D3D"} /> :
                                    <Icon name={"checkbox-marked-outline"} size={30} color={"#3D3D3D"} />
                            }
                            <Text style={styles.input}>Will customer finance the car?</Text>
                        </>
                    </TouchableOpacity>
                </View>
                <View
                    style={[styles.selectView,
                    { borderBottomColor: (!showBankNameMsg ? "gray" : colors.logoRed) }
                    ]}>
                    <Picker
                        selectedValue={bankName}
                        onValueChange={(itemValue, itemIndex) =>
                            setBankName(itemValue)
                        }
                        enabled={isFinance}
                    >
                        <Picker.Item
                            value="" label="Select Bank" color={colors.text}
                        />
                        {
                            banks.map((s, i) => {
                                return <Picker.Item key={i} color={colors.text} value={s} label={s} />
                            })
                        }

                    </Picker>
                </View>
                {
                    showBankNameMsg &&
                    <Text style={styles.errorText}>
                        Please select a Bank Name.
                    </Text>
                }
                <View style={[styles.inputView,
                { borderBottomColor: (!showLoanAmtMsg ? "gray" : colors.logoRed) }
                ]}>
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
                        Please select a valid loan amount.
                </Text>}

                <View
                    style={[styles.selectView,
                    { borderBottomColor: (!showActionIdMsg ? "gray" : colors.logoRed) }
                    ]}>
                    {/* <Text style={{ marginBottom: 5, fontSize: 18 }}>*</Text> */}

                    <Picker
                        selectedValue={actionById}
                        onValueChange={(itemValue, itemIndex) =>
                            setActionById(itemValue)
                        }
                    >
                        <Picker.Item
                            value="" label="* Select Reference" color={colors.text}
                        />
                        {
                            approvers.map((s, i) => {
                                return <Picker.Item key={i} color={colors.text} value={s.code} label={s.userName} />
                            })
                        }
                    </Picker>
                </View>

                {showActionIdMsg &&
                    <Text style={styles.errorText}>
                        Please select a approver.
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
                        Please enter a valid discount amount.
                </Text>
                }

                <View style={{ margin: 10 }} />
            </ScrollView >
            <TouchableOpacity style={{
                flexDirection: "row",
                padding: 15, justifyContent: 'center',
                width: "100%", backgroundColor: colors.logoBlue,
                shadowColor: 'gray', shadowOpacity: 0.5, elevation: 6,
                alignContent: "center"
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
        borderBottomWidth: 0.8,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBoxView: {
        flex: 1,
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    errorText: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.logoRed,
        marginBottom: 15
    },
    selectView: {
        flex: 2,
        borderColor: 'gray',
        borderRadius: 10,
        borderBottomWidth: 0.8,
        marginBottom: 10
    },
    navBar: {
        width: '100%',
        backgroundColor: '#FFF',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1,
        shadowColor: 'gray',
        elevation: 9, shadowOpacity: 1
    },
    navTitle: {
        flex: 1,
        marginLeft: 22, color: '#808080',
        fontSize: 20, fontWeight: 'bold'
    }
})