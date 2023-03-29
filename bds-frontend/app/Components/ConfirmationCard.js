import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import { Icon, Input } from 'react-native-elements';
import { Formik } from 'formik'
import colors from '../config/colors'
import { DatePicker } from 'react-native-woodpicker'
import { confirmDonation, fetchDonation } from '../apis/auth';
import Toast from 'react-native-root-toast';

export default function ConfirmationCard({ navigation, requestData }) {
    const [loading, setLoading] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [donation, setDonation] = useState({})
    const maxAmount = requestData.amountNeeded - requestData.amountFilled
    const [pickedDate, setPickedDate] = useState();

    const handleText = () => pickedDate
        ? pickedDate.toDateString()
        : "Choose Date";
    const handleDateChange = (value) => {
        setPickedDate(value)
    }
    useEffect(() => {
        const fetchDonationRequest = async () => {
            try {
                setLoading(true)
                const res = await fetchDonation(requestData?._id);
                setDonation(res?.data?.donation)
            } catch (error) {
                console.log("Errorrrrr::::", error)
            } finally {
                setLoading(false)
            }
        }
        fetchDonationRequest()
    }, [])
    return (
        <View style={styles.confirm}>
            <View>
                <Text style={styles.text}>
                    Choose date and amount
                </Text>
            </View>
            <Formik
                initialValues={{
                    amount: "",
                    date: new Date().getDate().toString()
                }}
                onSubmit={async (values) => {
                    try {
                        setWaiting(true)
                        await confirmDonation(requestData._id)
                    } catch (error) { console.log("error") }
                    finally {
                        setWaiting(false)
                        Toast.show("Request Accepted Successfully")
                    }
                    navigation.navigate('ProfileScreen')
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
                    <>
                        <View style={{ flexDirection: 'row', width: "100%", justifyContent: "center" }}>
                            <View style={{ alignSelf: 'center' }}>
                                <DatePicker
                                    onDateChange={(value) => {
                                        setPickedDate(value)
                                        setFieldValue("date", value)
                                    }}
                                    title="Date Picker"
                                    text={handleText()}
                                    isNullable={false}
                                    iosDisplay="inline"
                                    textInputStyle={{ color: "white" }}
                                    containerStyle={{ backgroundColor: "#506EDA", height: 40, borderRadius: 15, paddingHorizontal: 10, justifyContent: "center", }}
                                />
                            </View>
                        </View>
                        <View style={{ borderColor: "white", borderWidth: 1, width: '100%' }} />
                        <View style={styles.locationContainer}>
                            <Text style={styles.location}>{requestData.location || 'N/A'}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
                                <Text style={styles.yourLocation}>
                                    Lahore
                                </Text>
                                <Icon name="location" type="ionicon" color={colors.primary} size={20} />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button}
                            onPress={handleSubmit}>
                            <Text style={styles.buttonText}>
                                {waiting ? "Please wait..." : "Confirm"}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
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
    confirm: {
        height: "38%",
        width: "92%",
        backgroundColor: "#A2B5EB",
        borderRadius: 15,
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-evenly',
    },
    input: {
        height: 40,
        borderRadius: 15,
        backgroundColor: '#4864C5',
        width: 100,
        paddingHorizontal: 15,
        paddingVertical: 0,
        margin: 0
    },
    location: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.white
    },
    locationContainer: {
        flexDirection: 'column',
        width: '100%',
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.white
    },
    yourLocation: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.white,
        justifyContent: 'center'
    }
})
