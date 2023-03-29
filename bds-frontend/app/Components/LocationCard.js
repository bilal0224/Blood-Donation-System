import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';
import { Picker } from 'react-native-woodpicker'

import colors from '../config/colors'

export default function locationCard({ setFilterType }) {
    const [pickedData, setPickedData] = useState("A+");
    const data = [
        { label: "none", value: "all", },
        { label: "A+", value: "A+", },
        { label: "A-", value: "A-", },
        { label: "B+", value: "B+", },
        { label: "B-", value: "B-", },
        { label: "O+", value: "O+", },
        { label: "O-", value: "O-", },
        { label: "AB+", value: "AB+", },
        { label: "AB-", value: "AB-", },
    ]
    return (
        <>
            <View style={styles.locationCard}>
                <Text style={styles.locationText}>Location</Text>
                <View style={styles.location}>
                    <Text style={styles.city}>
                        Lahore
                    </Text>
                    <Text>
                        <Icon name="location" type="ionicon" color={colors.secondary} />
                    </Text>
                </View>
                <View style={{ borderBottomColor: "grey", borderBottomWidth: 1 }} />
                <View style={styles.bloodGroup}>
                    <Text style={styles.chooseBlood}>Choose your Blood Group</Text>
                    <TouchableOpacity
                        style={styles.bloodGroupLetterContainer}
                    >
                        <Picker
                            item={pickedData}
                            items={data}
                            onItemChange={(item) => {
                                setFilterType(item.value)

                            }}
                            title="Select Blood Group"
                            doneButtonLabel='Confirm'
                            placeholder="none"
                            textInputStyle={{ color: "white", alignSelf: "center", fontWeight: "bold", fontSize: 20 }}

                            containerStyle={{ height: 42, borderColor: "transparent", justifyContent: 'center' }}
                            isNullable={false}
                        />
                        {/* <Text style={styles.bloodGroupLetter}> O-</Text> */}
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.requestListText}>
                    Request List
                </Text>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    bloodGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10
    },
    bloodGroupLetterContainer: {
        height: 60,
        width: 70,
        borderRadius: 20,
        backgroundColor: "#B6C6FF",
        justifyContent: "center",
        alignItems: "center"
    },
    bloodGroupLetter: {
        color: colors.white,
        fontSize: 24,
        fontWeight: "bold",
    },
    city: {
        color: colors.white,
        fontSize: 24,
        fontWeight: "bold",
    },
    chooseBlood: {
        color: "#B6C6FF"
    },
    locationCard: {
        backgroundColor: colors.primary,
        padding: 20,
        margin: 10,
        borderRadius: 15,
    },
    location: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10
    },
    locationText: {
        color: "#B6C6FF",
        fontSize: 14,
        paddingBottom: 10
    },
    requestListText: {
        color: "#7D859D",
        fontSize: 18,
        fontWeight: "normal",
        paddingLeft: 20,
        paddingTop: 5
    },
})
