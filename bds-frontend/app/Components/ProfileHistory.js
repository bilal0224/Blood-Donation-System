import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { myDonationRequests, myDonations } from '../apis/auth'
import ProfileHistoryElement from './ProfileHistoryElement';


export default function ProfileHistory({ navigation }) {
    const [activeTab, setActiveTab] = useState("requests")
    const [donations, setDonations] = useState([])
    const [loading, setLoading] = useState([])
    const additionalDonationTextStyles = activeTab === 'donations' ? styles.active : styles.regular
    const additionalRequestTextStyles = activeTab === 'requests' ? styles.active : styles.regular
    const _myDonationRequests = async () => {
        try {
            setLoading(true)
            const res = await myDonationRequests();
            setDonations([...res?.data?.donationRequests])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const _myDonations = async () => {
        try {
            setLoading(true)
            const res = await myDonations()
            setDonations([...res?.data?.donations])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        _myDonationRequests()
    }, [])

    return (
        <>
            <View>
                {/* <TouchableOpacity onPress={ () => navigation.navigate('MessageScreen') } >
                    <Text>Chats</Text>
                </TouchableOpacity> */}
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => { setActiveTab("requests"); _myDonationRequests() }}>
                    <Text style={{ ...styles.requests, ...additionalRequestTextStyles }}>
                        Requests
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setActiveTab("donations"); _myDonations() }}>
                    <Text style={{ ...styles.dontaions, ...additionalDonationTextStyles }}>
                        Dontaions
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.profileHistoryContainer}>
                {
                    donations?.map((dh, index) => {
                        return <ProfileHistoryElement myDonationRequests={_myDonationRequests
                        } navigation={navigation} data={dh} key={index} activeTab={activeTab} />
                    })
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        width: '93%',
        justifyContent: 'space-evenly',
        marginTop: 10

    },
    active: {
        color: "#F44B4B"
    },
    regular: {
        color: "#DADADA"
    },
    dontaions: {
        fontSize: 18,
        fontWeight: "600",
        textDecorationLine: 'underline',

    },
    requests: {
        fontSize: 18,
        fontWeight: "600",
        textDecorationLine: 'underline',

    },
    profileHistoryContainer: {
        height: 340,
        width: '100%',
        paddingTop: 20
    },
})
