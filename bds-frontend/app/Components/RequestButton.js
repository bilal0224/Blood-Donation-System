import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native'
import { Icon, Overlay, Input } from 'react-native-elements';
import { Formik } from 'formik';
import { Picker } from 'react-native-woodpicker'
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';



import colors from '../config/colors'
import { postRequest } from '../apis/auth';

export default function RequestButton({ setLoading }) {
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const navigation = useNavigation()
    const [pickedData, setPickedData] = useState("A+");
    const data = [
        { label: "A+", value: "A+", },
        { label: "A-", value: "A-", },
        { label: "B+", value: "B+", },
        { label: "B-", value: "B-", },
        { label: "O+", value: "O+", },
        { label: "O-", value: "O-", },
        { label: "AB+", value: "AB+", },
        { label: "AB-", value: "AB-", },
    ]
    const requestSchema = Yup.object().shape({
        location: Yup.string().required('Required'),
        amountNeeded: Yup.number().required('Required'),
        diagnosis: Yup.string().required('Required'),
        bloodType: Yup.string().required('Required'),
    });
    return (
        <TouchableOpacity style={styles.requestBoton}>
            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={toggleOverlay} >
                <View style={styles.svg}>
                    <Icon name="blood-drop" type="fontisto" color="white" />
                </View>
            </TouchableOpacity>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <Formik
                    initialValues={{
                        location: '',
                        description: "",
                        amountNeeded: "",
                        diagnosis: "",
                        bloodType: ""
                    }}
                    validationSchema={requestSchema}
                    validateOnChange={(d) => {
                        console.log(d)
                    }}
                    onSubmit={async values => {
                        try {
                            setLoading && setLoading(true);
                            await postRequest({
                                ...values
                            })
                            setLoading && setLoading(false)
                            toggleOverlay()
                        } catch (error) {
                            console.log(error)
                        } finally {
                            setLoading && setLoading(false)
                            Toast.show("Request posted successfully")
                            navigation.navigate('LandingScreen', { changedAt: Date.now() })

                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors }) => (
                        <View style={styles.Overlay}>
                            <Input placeholder="Location*"
                                onChangeText={handleChange('location')}
                                onBlur={handleBlur('location')}
                                value={values.location}
                                autoCorrect={false}

                            />
                            <Text style={{ fontSize: 18, fontWeight: '600' }}>Choose Amount and Type</Text>
                            <View style={styles.amountAndTypeContainer}>
                                <View style={{ width: 100 }}>
                                    <Input placeholder="Amount"
                                        onChangeText={handleChange('amountNeeded')}
                                        onBlur={handleBlur('amountNeeded')}
                                        value={values.amount} style={styles.amount}
                                        autoCorrect={false}
                                        containerStyle={{ marginBottom: 0 }}
                                    />

                                </View>
                                <View style={{ width: 85 }}>
                                    <Picker
                                        item={pickedData}
                                        items={data}
                                        onItemChange={(item) => {
                                            setFieldValue("bloodType", item?.value)
                                        }}
                                        title="Select Blood Group"
                                        doneButtonLabel='Confirm'
                                        placeholder="Blood Group"
                                        textInputStyle={{ color: "#7D859D", alignSelf: "center" }}

                                        containerStyle={{ height: 42, borderBottomWidth: 0.8, borderColor: "#7D859D", justifyContent: 'center' }}
                                        isNullable={false}
                                    />
                                </View>
                            </View>
                            <Input
                                onChangeText={handleChange('diagnosis')}
                                onBlur={handleBlur('diagnosis')}
                                value={values.diagnosis} placeholder="Diagnosis*"
                                autoCorrect={false}
                            />
                            <Input onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description} placeholder="Description(optional)"
                                autoCorrect={false}
                            />
                            <TouchableOpacity style={styles.button}
                                onPress={() => {
                                    if (Object.keys(errors).length) {
                                        Alert.alert("Invalid Input")
                                    }
                                    else {
                                        handleSubmit()
                                    }
                                }}>
                                <Text style={styles.buttonText}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </Overlay>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    amount: {
        height: 25,
        width: 50,
        textAlign: "center"
    },
    amountAndTypeContainer: {
        flexDirection: "row",


    },
    button: {
        width: "55%",
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
    Overlay: {
        width: 300,
        height: 400,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    requestBoton: {
        height: 65,
        width: 65,
        borderRadius: 100,
        position: "absolute",
        backgroundColor: colors.secondary,
        left: '42%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    svg: {
        top: 19,
    },
})
