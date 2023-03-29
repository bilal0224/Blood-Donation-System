import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { Icon } from 'react-native-elements';
import Toast from 'react-native-root-toast';

import { deleteDonation, fetchUser } from '../apis/auth';


export default function ProfileHistoryElement({ navigation, data, myDonationRequests, activeTab }) {
    const requestData = data
    const [userDetails, setUserDetails] = useState({});
    const [waiting, setWaiting] = useState(false)
    useEffect(() => {
        setWaiting(true)
        const fetchUserDetails = async () => {
            try {
                const res = await fetchUser(requestData?.userId);
                setUserDetails(res?.data?.user)
            } catch (error) {
                console.log(error)
            } finally {
                setWaiting(false)
            }
        }
        fetchUserDetails()
    }, [])

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("RequestDescriptionScreen", { requestData, userDetails })
            }}

            style={{ flexDirection: 'row', alignItems: "center" }}>
            <View style={styles.element}>
                <View style={styles.dateContainer}>
                    <Text style={styles.month}>
                        {moment(data?.date).format('MMM')}
                    </Text>
                    <Text style={styles.date}>
                        {moment(data?.date).format('DD')}
                    </Text>
                </View>
                <View>
                    <View>
                        <Text style={styles.hospital}>
                            {data?.location || "N/A"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="blood-drop" type="fontisto" color={"grey"} size={12} />
                        <Text style={styles.amount}>1 pint of blood</Text>
                    </View>
                </View>

            </View>
            <View style={{ paddingTop: 25, flexDirection: "row" }}>

                {activeTab === "requests" ? <TouchableOpacity onPress={async () => {
                    try {
                        await deleteDonation(requestData._id);
                        myDonationRequests()
                        Toast.show("Deleted Successfully")
                    } catch (error) {
                        console.log("error while deleting", error)
                    }
                }}>
                    <Icon name="trash-outline" type="ionicon" color="red" size={30} />

                </TouchableOpacity> : <></>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    amount: {
        fontSize: 12,
        color: "grey",
        paddingLeft: 5
    },
    element: {
        width: '90%',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        paddingLeft: 25,
        paddingTop: 25,
        paddingRight: 25
    },
    dateContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingRight: 10
    },
    date: {
        fontSize: 48,
        color: "#413F89",
        letterSpacing: 0,
        lineHeight: 48
    },
    dot: {
        fontSize: 48,
        color: "#413F89"
    },
    hospital: {
        fontSize: 18,
        fontWeight: '600'
    },
    month: {
        fontSize: 12,
        color: "#413F89",
        letterSpacing: 0,
    },

})
