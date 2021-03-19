import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, TextInput, ImageBackgroundBase } from 'react-native';
import colors from '../../constants/Colors'
import { CheckBox } from '@ui-kitten/components';
import {
    Icon, Text, Autocomplete, AutocompleteItem,
    IndexPath, Layout, Select, SelectItem
} from '@ui-kitten/components';
import useRequest from '../../hooks/useRequest';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateRequest = () => {

    const { makeRequest } = useRequest();

    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [carVariant, setCarVariant] = useState('');
    const [isFinance, setIsFinance] = useState(false);
    const [selectedBank, setBank] = useState({});
    const [loanAmount, setLoanAmount] = useState();
    const [isMSIL_Ew, setIsMSIL_Ew] = useState(false);
    const [isR_Ew, setIsR_Ew] = useState(false);
    const [mgaAmount, setMgaAmount] = useState();
    const [actionById, setActionById] = useState();
    const [proposedDiscountAmt, setProposedDiscountAmt] = useState();

    const [selectedIndex, setSelectedIndex] = React.useState();
    const [allBanks, setAllBanks] = useState([])
    const [banks, setBanks] = useState([])
    const [approvers, setApprovers] = useState([])

    useEffect(() => {
        makeRequest({
            url: '/banks',
            method: 'GET',
            onSuccess: (res) => {
                setAllBanks(res)
                makeRequest({
                    url: '/approvers',
                    method: 'GET',
                    onSuccess: (res) => {
                        setApprovers(res)
                    }
                })
            }
        })
    }, []);

    const onSubmit = () => {

        if (!customerName || !customerPhone || !carVariant || !isFinance || !isMSIL_Ew || !isR_Ew || !mgaAmount || !actionById || !proposedDiscountAmt)
            return false

        if (isFinance) {
            if (!selectedBank?.bankId || !loanAmount) return false
        }

        makeRequest({
            url: '/discountRequests',
            method: 'POST',
            body: {
                actionById, customerName, customerPhone, carVariant, isFinance,
                loanAmount, isMSIL_Ew, isR_Ew, mgaAmount, proposedDiscountAmt,
                bankId: selectedBank?.bankId
            },
            onSuccess: (res) => {

            },
            onError: () => setLoading(false)
        })
    }

    const filter = (item, query) => item.name.toLowerCase().includes(query.toLowerCase());
    const onBankSelect = (index) => {
        setBank(banks[index].name);
    };

    const onBankChangeText = (query) => {
        setBank(query)
        if (query.length < 3) return
        setBanks(allBanks)
        setBanks(banks.filter(item => filter(item, query)));
    };

    const bankRenderOption = (item, index) => (
        <AutocompleteItem
            style={{ fontSize: 18, paddingHorizontal: 0 }}
            key={index}
            title={item.name}
        />
    );


    return (
        <View style={styles.formView}>

            <View style={styles.inputView}>
                <Text style={{ marginBottom: 5, fontSize: 18 }}>*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Customer Name"
                    placeholderTextColor={colors.text}
                    onChangeText={text => setCustomerName(text)}
                    defaultValue={customerName}
                    underlineColorAndroid="transparent"
                />
            </View>
            <View style={styles.inputView}>
                <Text style={{ marginBottom: 5, fontSize: 18 }}>*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Customer Phone"
                    placeholderTextColor={colors.text}
                    onChangeText={text => setCustomerPhone(text)}
                    defaultValue={customerPhone}
                    underlineColorAndroid="transparent"
                    keyboardType={"phone-pad"}
                />
            </View>

            <View style={styles.inputView}>
                <Text style={{ marginBottom: 5, fontSize: 18 }}>*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Car Variant"
                    placeholderTextColor={colors.text}
                    onChangeText={text => setCarVariant(text)}
                    defaultValue={carVariant}
                    underlineColorAndroid="transparent"
                />
            </View>

            <View style={styles.inputView}>
                <Text style={{ marginBottom: 5, fontSize: 18 }}>*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Proposed Discount Amount"
                    placeholderTextColor={colors.text}
                    onChangeText={text => setProposedDiscountAmt(text)}
                    defaultValue={proposedDiscountAmt}
                    underlineColorAndroid="transparent"
                    keyboardType={"decimal-pad"}
                />
            </View>

            <View style={styles.inputView}>
                <Text style={{ marginBottom: 5, fontSize: 18 }}>*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="MGA/NGA Amount"
                    placeholderTextColor={colors.text}
                    onChangeText={text => setMgaAmount(text)}
                    defaultValue={mgaAmount}
                    underlineColorAndroid="transparent"
                    keyboardType={"decimal-pad"}
                />
            </View>

            <View>
                <Select
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}
                    style={[styles.inputView, {
                        backgroundColor: "white",
                        borderColor: "white",
                        paddingLeft: 0,
                        borderWidth: 0,
                        borderBottomColor: "gray",
                        marginRight: "auto",
                        paddingLeft: 0,
                        fontSize: 18,
                    }
                    ]}
                >
                    <SelectItem title='Option 7' />
                    <SelectItem title='Option 2' />
                    <SelectItem title='Option 3' />
                </Select>
            </View>


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

            <View>
                <Autocomplete
                    placeholder="Select Bank"
                    placeholderTextColor={colors.text}
                    value={selectedBank}
                    onSelect={onBankSelect}
                    onChangeText={onBankChangeText}
                    style={[styles.inputView, styles.input, {
                        backgroundColor: "white",
                        borderColor: "white",
                        paddingLeft: 0,
                        borderBottomColor: "gray",
                        marginRight: "auto",
                        paddingLeft: 0,
                        fontSize: 18,
                    }
                    ]}
                >
                    {banks.map(bankRenderOption)}
                </Autocomplete>
            </View>

            <View style={[styles.inputView]}>
                <TextInput
                    style={styles.input}
                    placeholder="Loan Amount"
                    placeholderTextColor={colors.text}
                    onChangeText={text => setLoanAmount(text)}
                    defaultValue={loanAmount}
                    editable={isFinance}
                    underlineColorAndroid="transparent"
                    keyboardType={"decimal-pad"}
                />

            </View>

            <TouchableOpacity style={{
                marginBottom: 0, width: "100%", color: colors.logoBlue
            }}>
                <Text>SEND REQUEST</Text>
            </TouchableOpacity>

        </View >
    )
}

export default CreateRequest

const styles = StyleSheet.create({

    formView: {
        flex: 1,
        margin: 25,
        justifyContent: 'flex-start'
    },
    inputIcon: {
        padding: 10,
    },
    input: {
        color: "#505050",
        fontSize: 18,
        marginHorizontal: 5,
    },
    inputView: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBoxView: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }

})