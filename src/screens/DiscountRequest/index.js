import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/Colors'

const RequestList = () => {

    const groupBy = ["Today", "Yesterday", "Older"]

    return (
        <>
            <View style={styles.headerDiv}>
                <Text style={styles.headingText}>TODAY&nbsp;&nbsp;</Text>
            </View>

            <RequestCard />
            <RequestCard />
        </>
    );
}

const RequestCard = () => {
    return (
        <Pressable
            onPress={() => {
                console.log("Long Press")
            }}
            style={({ pressed }) => [
                styles.cardbg,
                {
                    backgroundColor: pressed
                        ? '#CFFED4'
                        : '#FFF',
                },
            ]}
            android_ripple={{ color: "#CFFED4", borderless: false }}
        >
            <>
                <View style={{ ...styles.cardTopRow }}>
                    <View style={styles.mainDiv}>
                        <Text style={styles.cardTopText}>#1001</Text>
                        <Text style={styles.cardTopText}>Sheetal Singh</Text>
                    </View>
                    <View style={styles.amountTextDiv}>
                        <Text style={styles.amountText} >₹2000 </Text>
                    </View>
                </View>

                <View style={styles.cardRow}>
                    <Icon name="person-circle-outline" size={25} color={colors.icon} />
                    <Text style={styles.cardText}>
                        Bhumika Ojha, 9660025494
          </Text>
                </View>
                <View style={styles.cardRow}>
                    <Icon name="car-outline" size={25} color={colors.icon} />
                    <Text style={styles.cardText}>
                        Maruti Suzuki Ertiga
          </Text>
                </View>
                <View style={styles.cardRow}>
                    <Icon name="cash-outline" size={25} color={colors.icon} />
                    <Text style={styles.cardText}>
                        Bank of Baroda, ₹2500
          </Text>
                </View>
                <View style={styles.cardRow}>
                    <Icon name="settings-outline" size={25} color={colors.icon} />
                    <Text style={styles.cardText}>
                        MSILEW | REW | MGA ₹500
                    </Text>
                </View>
            </>
        </Pressable >
    )
}

export default RequestList


const styles = StyleSheet.create({

    cardbg: {
        width: "92%",
        flexDirection: "column",
        paddingVertical: 15,
        borderLeftWidth: 5,
        borderLeftColor: "green",
        borderRightColor: "#C0C0C0",
        borderTopColor: "#C0C0C0",
        borderBottomColor: "#C0C0C0",
        borderBottomWidth: 2,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTopRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10,
        paddingLeft: 10,
    },
    cardRow: {
        paddingLeft: 20,
        color: "black",
        flexDirection: "row",
        marginVertical: 5,
        alignItems: "center"
    },
    cardText: {
        color: colors.text,
        fontSize: 18,
        paddingLeft: 10
    },
    cardTopText: {
        fontSize: 20,
        paddingLeft: 10,
        fontWeight: "bold",
    },
    amountText: {
        fontSize: 21,
        color: colors.red,
        fontWeight: "bold",
        paddingVertical: 5,
        paddingLeft: 20,
        paddingRight: 10
    },
    amountTextDiv: {
        borderColor: '#C0C0C0',
        borderStyle: 'dashed',
        borderWidth: 1.5,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        backgroundColor: "#F8F6F6",
        marginLeft: "auto"
    },
    mainDiv: {
        flexDirection: "column",
    },
    headerDiv: {
        width: "92%",
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    headingText: {
        color: colors.text,
        fontSize: 20,
        textAlign: 'left'
    },
    divider: {
        flex: 1, height: 1, backgroundColor: '#808080'
    }
});
