import { Formik } from 'formik'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import colors from '../config/colors'
import * as Yup from 'yup';
import { signup } from '../apis/auth'
import { saveInStorage } from '../utils'
import { useNavigation } from '@react-navigation/native'


const SignUpSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    verifyPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    email: Yup.string().email('Invalid email').required('Required'),
});
export default function SignupScreen() {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    return (
        <ScrollView contentContainerStyle={styles.Container}>
            <View style={styles.content}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 16 }}>
                        Welcome to
                        <Text style={{ color: '#506EDA', fontWeight: "bold" }}>
                            {" "} BDS
                        </Text>
                    </Text>
                    <Text style={{ fontSize: 16, color: "#8D8D8D" }}>
                        Have an Account?{"\n"}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SigninScreen')}
                        >
                            <Text style={{ color: '#506EDA' }}>Sign in</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                <View>
                    <Text style={{ fontWeight: "500", fontSize: 40, color: "#F1908C" }}>
                        Sign up
                    </Text>
                </View>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        firstName: "",
                        lastName: "",
                        verifyPassword: "",
                        contactNumber: "",
                        bloodGroup: ""
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={async (values) => {
                        try {
                            setLoading(true)
                            const { verifyPassword, ...payload } = values;
                            const res = await signup(payload);
                            await saveInStorage("token", res?.data?.token)
                            setLoading(false)
                            navigation.navigate('LandingScreen')

                        } catch (error) {
                            Alert.alert("Something went wrong")
                            setLoading(false)
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "400", paddingBottom: 15 }}>
                                        First Name
                                    </Text>
                                    <Input
                                        placeholder="First Name"
                                        style={styles.input}
                                        onChangeText={handleChange('firstName')}
                                        onBlur={handleBlur('firstName')}
                                        value={values?.firstName}
                                        inputContainerStyle={{ borderBottomWidth: 0, }}
                                        containerStyle={{ paddingLeft: 0 }}
                                    >
                                    </Input>
                                    <Text>{errors.firstName}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "400", paddingBottom: 15 }}>
                                        Last Name
                                    </Text>
                                    <Input
                                        placeholder="Last Name"
                                        style={styles.input}
                                        onChangeText={handleChange('lastName')}
                                        onBlur={handleBlur('lastName')}
                                        value={values?.lastName}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        containerStyle={{ paddingHorizontal: 0 }}
                                    >
                                    </Input>
                                    <Text>{errors.lastName}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: "400", paddingBottom: 15 }}>
                                    Enter your Username or email address
                                </Text>
                                <Input
                                    placeholder="Username or Email"
                                    textContentType="emailAddress"
                                    style={styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    autoCapitalize="none"
                                    value={values?.email}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    containerStyle={{ paddingHorizontal: 0 }}
                                >
                                </Input>
                                <Text>{errors.email}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "400", paddingBottom: 15 }}>
                                        Blood Group
                                    </Text>
                                    <Input
                                        placeholder="Blood Group"
                                        style={styles.input}
                                        onChangeText={handleChange('bloodGroup')}
                                        onBlur={handleBlur('bloodGroup')}
                                        value={values?.bloodGroup}
                                        inputContainerStyle={{ borderBottomWidth: 0, }}
                                        containerStyle={{ paddingLeft: 0 }}
                                    >
                                    </Input>
                                    <Text>{errors.bloodGroup}</Text>

                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "400", paddingBottom: 15 }}>
                                        Contact Number
                                    </Text>
                                    <Input
                                        placeholder="Contact"
                                        textContentType="telephoneNumber"
                                        style={styles.input}
                                        onChangeText={handleChange('contactNumber')}
                                        onBlur={handleBlur('contactNumber')}
                                        value={values?.contactNumber}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        containerStyle={{ paddingHorizontal: 0 }}
                                    >
                                    </Input>
                                    <Text>{errors.contactNumber}</Text>

                                </View>
                            </View>
                            <View style={{ padding: 0 }}>
                                <Text style={{ fontSize: 16, fontWeight: "400", paddingBottom: 15 }}>
                                    Enter your Password
                                </Text>
                                <Input
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    textContentType="password"
                                    style={styles.input}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values?.password}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    containerStyle={{ paddingHorizontal: 0 }}
                                >
                                </Input>
                                <Text>{errors.password}</Text>
                            </View>
                            {/* <View style={{ padding: 0 }}>
                                <Text style={{ fontSize: 16, fontWeight: "400", paddingBottom: 15 }}>
                                    Verify your Password
                                </Text>
                                <Input
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    textContentType="password"
                                    style={styles.input}
                                    onChangeText={handleChange('verifyPassword')}
                                    onBlur={handleBlur('verifyPassword')}
                                    value={values?.verifyPassword}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    containerStyle={{ paddingHorizontal: 0 }}
                                >
                                </Input>
                                <Text>{errors.verifyPassword}</Text>

                            </View> */}
                            <TouchableOpacity disabled={loading} style={{ ...styles.button, backgroundColor: `${loading ? "grey" : "#F1908C"}` }}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonText}>
                                    {loading ? "Please wait.." : "Sign up"}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}</Formik>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    button: {
        width: "92%",
        backgroundColor: colors.secondary,
        alignItems: "center",
        padding: 10,
        borderRadius: 15,
        alignSelf: 'center'
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: colors.white
    },
    Container: {
        backgroundColor: "#506EDA",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 900
    },
    content: {
        width: "90%",
        height: "90%",
        backgroundColor: "white",
        borderRadius: 40,
        padding: 25,
        justifyContent: "space-evenly"
    },
    input: {
        borderWidth: 1,
        borderRadius: 9,
        padding: 15,
        borderColor: '#ADADAD',
    },
    sso: {
        width: '100%',
        backgroundColor: "#E9F1FF",
        padding: 17,
        borderRadius: 9,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    }
})
