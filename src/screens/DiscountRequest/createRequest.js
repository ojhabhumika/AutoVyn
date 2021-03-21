import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, TextInput, ImageBackgroundBase, ScrollView } from 'react-native';
import colors from '../../constants/Colors'
import { CheckBox } from '@ui-kitten/components';
import {
    Icon, Text, Autocomplete, AutocompleteItem,
    IndexPath, Layout, Select, SelectItem
} from '@ui-kitten/components';
import useRequest from '../../hooks/useRequest';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationBar from '../../components/NavigationBar'


const CreateRequest = ({navigation}) => {

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
            onFailure: () => setLoading(false)
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
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <NavigationBar navigation={navigation} menu={'logout'} goBack hide style={ { shadowColor:'gray',elevation:9, shadowOpacity:1 }}/>
       
        <ScrollView style={styles.formView} showsVerticalScrollIndicator={false}>
            
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
                    keyboardType={"number-pad"}
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
                    keyboardType={"number-pad"}
                />
            </View>

            <View>
                <Select
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}
                    style={{
                        backgroundColor: "white",
                        borderColor: "white",
                        borderWidth: 0.5,
                        marginRight: "auto",
                        fontSize: 18,
                        marginBottom: 20,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
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
                    keyboardType={"number-pad"}
                />

            </View>
            <View style={{margin:10}}/>
        </ScrollView >
        <TouchableOpacity style={{padding:15,alignItems:'center', width: "100%", backgroundColor:colors.logoBlue, shadowColor:'gray',shadowOpacity:0.5,elevation:6
            }}>
                <Text style={{color: '#fff',fontWeight:'bold',fontSize:18}}>SEND REQUEST</Text>
            </TouchableOpacity>
        </View>
        )
}

export default CreateRequest

const styles = StyleSheet.create({

    formView: {
        flex: 1,
        marginHorizontal: 25,
        paddingTop:20
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
        borderBottomWidth: 0.5,
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