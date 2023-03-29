import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';
import Toast from 'react-native-root-toast';

import { me } from '../apis/auth'

import colors from '../config/colors'

export default function ProfilePicture() {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({})
       
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                setLoading(true)
                const res = await me()
                setUserData(res.data.user)
                setLoading(false)
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchCurrentUser()
    }, [])
    return (
        <View style={styles.pic}>
            {loading ? <Text style={{ color: "white", fontSize: 25 }}>Loading...</Text>
                : <>
                    <Text style={styles.profileName}>
                        {userData.firstName} {userData.lastName}
                    </Text>
                    <Text style={styles.profileName}>
                        <Icon name="call-outline" type="ionicon" color="#F1908C" size={25} style={{ paddingRight: 10 }} />
                        {userData.contactNumber}
                    </Text>
                    <Text style={styles.profileName}>

                        Blood Group: {userData.bloodGroup}
                    </Text>
                    <Text style={styles.profileName}>
                        <Icon name="mail-outline" type="ionicon" color="#F1908C" size={25} style={{ paddingRight: 10 }} />
                        {userData.email}
                    </Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => { Toast.show("Coming soon") }}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    pic: {
        height: 255,
        width: '94%',
        backgroundColor: "black",
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: "center",
        padding: 20,
        marginTop: 20
    },
    profileName: {
        fontSize: 24,
        color: colors.white
    },
    editButton: {
        height: 30,
        width: 70,
        backgroundColor: "#DADADA",
        borderRadius: 15,
        alignSelf: "flex-start",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 17
    },
})
