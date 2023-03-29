import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native'

import colors from '../config/colors'
import { me } from '../apis/auth';

export default function RequestDiscription({ requestData, userDetails }) {
    const copyToClipboard = (string) => {
        Clipboard.setString(string);
    };
    const item = userDetails
    const navigation = useNavigation()
    const [currentUser, setCurrentUser] = useState({})
    const fetchCurrentUser = async () => {
        try {
            const res = await me()
            setCurrentUser(res.data.user,
            )

        } catch (error) {
            console.log("error", error)
        }
    }
    fetchCurrentUser()
    let avatarTitle = `${userDetails && userDetails?.firstName && userDetails.firstName[0] ? userDetails?.firstName[0]
        : "-"}${userDetails && userDetails?.lastName && userDetails?.lastName[0] ? userDetails?.lastName[0] : "-"}`

    const shareString = userDetails?.firstName + " " + userDetails?.lastName + "\nBlood Group: " + requestData?.bloodType + "\nContact: " + userDetails?.contactNumber
    return (
        <View style={styles.RequestDetailContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <TouchableOpacity onPress={() => { copyToClipboard(shareString), Toast.show("Copied to clipboard") }}>
                    <Icon name="share-social-outline" type="ionicon" color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { currentUser, item })}>
                    <Icon name="chatbubbles-outline" type="ionicon" color='white' />
                </TouchableOpacity>
            </View>
            <Avatar rounded
                title={avatarTitle}
                style={styles.avatar} />
            <Text style={styles.receiverName}>{userDetails?.firstName} {userDetails?.lastName}</Text>
            <Text style={styles.requestId}>
                #{requestData?._id.slice(0, 5)}
            </Text>
            <Text style={styles.RequestDetail}>
                {requestData?.description || "N/A"}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 60,
        height: 60,
        backgroundColor: colors.secondary,
        borderRadius: 100
    },
    RequestDetailContainer: {
        flexDirection: 'column',
        width: "100%",
        height: 250,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    receiverName: {
        fontSize: 18,
        color: colors.white,
        fontWeight: '600'
    },
    requestId: {
        fontSize: 18,
        color: colors.secondary,
        fontWeight: '600'
    },
    RequestDetail: {
        fontSize: 18,
        color: '#DADADA',
        textAlign: "center",

    }
})
