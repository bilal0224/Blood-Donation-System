import React, {
    useState, useEffect
} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar, Icon } from 'react-native-elements';
import { fetchUser } from '../apis/auth';
import colors from '../config/colors'

export default function RequestCard({ navigation, requestData }) {
    const [userDetails, setUserDetails] = useState({});
    const [waiting, setWaiting] = useState(false)
    useEffect(() => {
        setWaiting(true)
        const fetchUserDetails = async () => {
            try {
                const res = await fetchUser(requestData?.userId);
                // console.log("///////////////////////////res", res?.data)
                setUserDetails(res?.data?.user)
            } catch (error) {
                console.log(error)
            } finally {
                setWaiting(false)
            }
        }
        fetchUserDetails()
    }, [])
    let avatarTitle = `${userDetails && userDetails?.firstName && userDetails.firstName[0] ? userDetails?.firstName[0]
        : "-"}${userDetails && userDetails?.lastName && userDetails?.lastName[0] ? userDetails?.lastName[0] : "-"}`

    return (
        <TouchableOpacity onPress={() => navigation.navigate('RequestDescriptionScreen', {
            requestData,
            userDetails
        })}>
            <View style={styles.requestCard}>
                <View style={styles.requestLocation}>
                    <Avatar
                        rounded
                        title={waiting ? '--' : avatarTitle}
                        style={styles.avatar} />
                    <Text style={styles.receiverName}>{waiting ? '--' : userDetails?.firstName} {waiting ? '--' : userDetails?.lastName}</Text>
                    <View style={styles.hospitalInfo}>
                        <Icon name="location" type="ionicon" color="#506EDA" size={16} />
                        <Text style={styles.hospitalName}>{requestData?.location}</Text>
                    </View>
                </View>
                <View style={styles.requestInfo}>
                    <Text style={styles.bloodGroupType}>
                        {requestData?.bloodType}
                    </Text>
                    <View style={{ borderColor: "grey", borderWidth: 1, width: 95 }} />
                    <View style={styles.amountContainer}>
                        <Text style={styles.filledAmount}>{requestData?.amountFilled}</Text>
                        <Text style={styles.totalAmount}>/{requestData?.amountNeeded}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    avatar: {
        height: 60,
        width: 60,
        backgroundColor: "black",
        borderRadius: 100
    },
    amountContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    bloodGroupType: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 24
    },
    hospitalInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    hospitalName: {
        fontSize: 14,
    },
    filledAmount: {
        color: "#4A67D0",
        fontWeight: "bold",
        fontSize: 24
    },
    requestCard: {
        padding: 10,
        backgroundColor: colors.tertiary,
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 15,
        marginTop: 10
    },
    requestInfo: {
        justifyContent: "space-evenly",
        alignItems: "center",
        width: 120,
        height: 120,
        borderRadius: 100,
        marginTop: 10,
        marginBottom: 10,
        borderColor: colors.secondary,
        borderWidth: 3
    },
    requestLocation: {
        height: 120,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10
    },
    receiverName: {
        fontWeight: "bold",
        fontSize: 18
    },
    totalAmount: {
        color: "grey",
        fontWeight: "bold",
        fontSize: 24
    },
})
