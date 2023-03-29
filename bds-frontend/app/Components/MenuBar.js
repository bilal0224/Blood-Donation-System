import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import RequestButton from './RequestButton';

export default function MenuBar({ setLoading }) {
    const [activeTab, setActiveTab] = useState("home")
    const navigation = useNavigation();
    return (
        <View style={styles.menuBar}>
            <View style={styles.div2}>
                <TouchableOpacity onPress={() => {
                    setActiveTab("home")
                    navigation?.navigate('LandingScreen')
                }}>
                    <Icon name="home" type="ionicon" color={activeTab === "home" ? "#3880ff" : 'grey'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation?.navigate('MessageScreen') }}>
                    <Icon name="chatbubbles" type="ionicon" color={activeTab === "notification" ? "#3880ff" : 'grey'} />
                </TouchableOpacity>
            </View>
            <View style={styles.div2}>
                <TouchableOpacity onPress={() => {
                    setActiveTab("ngolist")
                    navigation?.navigate('NgoListScreen')
                }}>
                    <Icon name="institution" type="font-awesome" color={activeTab === "ngolist" ? "#3880ff" : 'grey'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setActiveTab("profile")
                    navigation?.navigate('ProfileScreen')
                }}>
                    <Icon name="person" type="ionicon" color={activeTab === "profile" ? "#3880ff" : 'grey'} />
                </TouchableOpacity>
            </View>
            <RequestButton setLoading={setLoading} />
        </View>
    )
}

const styles = StyleSheet.create({
    active: {
        color: "#4667D7"
    },
    menuBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 65,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        marginBottom: 10
    },
    div1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly",
    },
    div2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly",
    },

})
