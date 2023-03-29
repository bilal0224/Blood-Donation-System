import React from 'react'
import { StyleSheet, Text, TouchableOpacity, SafeAreaView, View, Button } from 'react-native'

import LocationMap from '../Components/LocationMap'
import ConfirmationCard from '../Components/ConfirmationCard'
import AndriodSafeAreaView from '../Components/AndriodSafeAreaView';

import colors from '../config/colors'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ConfirmationScreen() {
    const navigation = useNavigation()
    const route = useRoute()
    const requestData = route?.params?.requestData
    return (
        <SafeAreaView style={{ ...styles.container, ...AndriodSafeAreaView.AndroidSafeArea }}>
            <LocationMap requestData={requestData} />
            <ConfirmationCard requestData={requestData} navigation={navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "92%",
        backgroundColor: colors.secondary,
        alignItems: "center",
        padding: 10,
        borderRadius: 15,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: colors.white
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        // margin: 15,
        backgroundColor: "white"
    },
    confirmation: {
        flex: 3,
    },
    map: {
        flex: 5,
    },
    topBar: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    topBarText: {
        color: colors.black,
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: 20
    },
})
