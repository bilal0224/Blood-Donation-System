import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements';


import colors from '../config/colors'

export default function RequestDiscriptionAmount({ requestData }) {
    return (
        <View style={styles.amountContainer}>
            <Text style={styles.headingText}>Diagonosis</Text>
            <Text style={styles.descriptonText}>{requestData?.diagnosis || "N/A"}</Text>
            <Text style={styles.headingText}>Location</Text>
            <Text style={styles.descriptonText}>{requestData?.location || "N/A"}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.headingText}>Status</Text>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Text style={{ ...styles.headingText, fontWeight: "bold", color: "white", marginRight: 5 }}>Incomplete</Text>
                    <Icon name="ellipsis-horizontal-circle-outline" type="ionicon" color="red" size={30} />
                </View>

            </View>
            <View style={{ borderColor: "grey", borderWidth: 1, width: '100%' }} />
            <View style={{ flexDirection: 'row', justifyContent: "space-evenly", alignItems: 'center' }}>
                <View>
                    <Text style={styles.amountText}>Filled</Text>
                    <Text style={styles.amountDescripton}>{requestData?.amountFilled}</Text>
                </View>
                <View>
                    <Icon name="blood-drop" type="fontisto" color="#FCC0BD" size={80} />
                    <Text style={styles.bloodGroup}>{requestData?.bloodType}</Text>
                </View>
                <View>
                    <Text style={styles.amountText}>Need</Text>
                    <Text style={styles.amountDescripton}>{requestData?.amountNeeded}</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    amountContainer: {
        height: 325,
        width: '100%',
        flexDirection: "column",
        justifyContent: "space-evenly",
        backgroundColor: "#4762C6",
        borderRadius: 15,
        padding: 20
    },
    amountText: {
        fontSize: 18,
        color: '#DADADA'
    },
    amountDescripton: {
        fontSize: 35,
        color: colors.white,
        fontWeight: '600',
        paddingTop: 8
    },
    bloodGroup: {
        position: "absolute",
        fontWeight: "bold",
        fontSize: 25,
        alignSelf: "center",
        paddingTop: 35,
        color: "#4762C6"
    },
    descriptonText: {
        fontSize: 18,
        color: colors.white,
        fontWeight: '600'
    },
    headingText: {
        fontSize: 14,
        color: '#DADADA'
    },

})
