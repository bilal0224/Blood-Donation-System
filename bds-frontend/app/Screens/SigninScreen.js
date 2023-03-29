import { Formik } from 'formik'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import colors from '../config/colors'
import * as Yup from 'yup';
import { signin } from '../apis/auth'
import { saveInStorage } from '../utils'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-root-toast';


const SignInSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export default function SigninScreen() {
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
                        No Account?{"\n"}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignupScreen')}
                        >
                            <Text style={{ color: '#506EDA' }}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                <View>
                    <Text style={{ fontWeight: "500", fontSize: 40, color: '#F1908C' }}>
                        Sing in
                    </Text>
                </View>
                <TouchableOpacity style={styles.sso} onPress={() => {
                    Toast.show('feature coming soon')
                }}>
                    <Icon name="logo-google" type="ionicon" color='#506EDA' />
                    <Text style={{ color: "#4285F4", marginLeft: 13 }}>Sign in with Google</Text>
                </TouchableOpacity>

                <Formik
                    initialValues={{
                        email: "2017n1191@gmail.com",
                        password: "1234567"
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={async (values) => {
                        try {
                            setLoading(true)
                            const res = await signin(values);
                            await saveInStorage("token", res?.data?.token)
                            setLoading(false)
                            navigation.navigate('LandingScreen')
                            Toast.show("Signed in successfully")
                        } catch (error) {

                            Alert.alert("Incorrect email or password")
                            setLoading(false)

                        }

                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: "400", paddingBottom: 15 }}>
                                    Enter your Username or email address
                                </Text>
                                <Input
                                    placeholder={"Username or Email"}
                                    textContentType="emailAddress"
                                    style={styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values?.email}
                                    autoCapitalize="none"
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    containerStyle={{ paddingHorizontal: 0 }}
                                    autoCorrect={false}
                                >
                                </Input>
                                <Text style={{ color: "red" }}>{errors.email}</Text>
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
                                    inputContainerStyle={{ borderBottomWidth: 0, }}
                                    containerStyle={{ paddingHorizontal: 0, margin: 0 }}
                                >
                                </Input>
                                <Text style={{ color: "red" }}>{errors.password}</Text>
                                <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                                    <Text style={{ fontSize: 11, color: "#4285F4" }}>
                                        Forgot Password
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity disabled={loading} style={{ ...styles.button, backgroundColor: `${loading ? "grey" : "#F1908C"}` }}
                                onPress={
                                    handleSubmit
                                }
                            >
                                <Text style={styles.buttonText}>
                                    {loading ? "Please wait..." : "Sign in"}
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
        minHeight: 800
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
