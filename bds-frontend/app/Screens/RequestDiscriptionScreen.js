import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements';


import RequestDiscription from '../Components/RequestDiscription';
import RequestDiscriptionAmount from '../Components/RequestDiscriptionAmount';
import colors from '../config/colors'
import { useNavigation, useRoute } from '@react-navigation/native';
import { callNumber } from '../utils';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import { me } from '../apis/auth';

export default function RequestDiscriptionScreen() {
    const copyToClipboard = (string) => {
        Clipboard.setString(string);
    };
    const route = useRoute()
    const navigation = useNavigation()
    const requestData = route?.params?.requestData
    const userDetails = route?.params?.userDetails
    const phoneNumber = userDetails?.contactNumber
    return (

        <SafeAreaView style={{ ...styles.discriptionContainer, ...styles.AndroidSafeArea }}>
            <ScrollView>
                <TouchableOpacity
                    style={{ marginLeft: 25 }}
                    onPress={() => { navigation?.navigate('LandingScreen') }}>
                    <Text style={{ color: "white" }}> {"Home"}</Text>
                </TouchableOpacity>
                <View style={{ ...styles.weirdPadding, paddingTop: 0 }}>
                    <RequestDiscription userDetails={userDetails} requestData={route?.params.requestData} />
                </View>
                <View style={styles.weirdPadding}>
                    <RequestDiscriptionAmount requestData={route?.params.requestData} />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity style={styles.contactNumberContainer} onPress={() => { callNumber(phoneNumber) }}>

                        <Icon name="call" type="ionicon" color="#2cfa1c" size={25} style={{ paddingRight: 10 }} />
                        <Text style={{ color: "white", fontSize: 25 }}>
                            {userDetails?.contactNumber}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { copyToClipboard(phoneNumber), Toast.show("Copied to clipboard") }}>
                        <Icon name="clipboard-outline" type="ionicon" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={styles.weirdPadding}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => navigation?.navigate('ConfirmationScreen', { requestData })}>
                        <Text style={styles.buttonText}>
                            Accept
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    button: {
        width: "100%",
        backgroundColor: colors.secondary,
        alignItems: "center",
        padding: 15,
        borderRadius: 15,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: colors.white
    },
    contactNumberContainer: {
        flexDirection: "row",
        alignSelf: 'center',
        margin: 10
    },
    discriptionContainer: {
        backgroundColor: colors.primary,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    topBar: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    topBarText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: 20
    },
    weirdPadding: {
        padding: 25
    }

})
