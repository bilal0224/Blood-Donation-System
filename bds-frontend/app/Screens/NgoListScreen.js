
import React, { useEffect, useState } from 'react'
import { Icon, SearchBar } from 'react-native-elements';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { fetchNgos } from '../apis/auth';
import { useNavigation } from '@react-navigation/native';
import NgoCard from '../Components/NgoCard';
import AndriodSafeAreaView from '../Components/AndriodSafeAreaView';

export default function LandingScreen() {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [ngo,setNgo]= useState([])
    useEffect(() => {
            const NgoList = async () => {
                try {
                    const res = await fetchNgos()
                    setNgo(res.data.ngos)
                
                } catch (error) {
                    console.log("error", error)
                } 
            }
            NgoList()
    }, [])

    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };
    return (

        <SafeAreaView style={{ ...styles.container, ...AndriodSafeAreaView.AndroidSafeArea }}>
            {loading ? <Text>Loading..</Text> : (
                <>
                    <View style={styles.topBar}>
                        <SearchBar
                            placeholder="Search..."
                            onChangeText={updateSearch}
                            value={search}
                            containerStyle={{
                                backgroundColor: "white", width: "50%", height: 50, borderBottomColor: "transparent", borderTopColor: "transparent"
                            }}
                            inputContainerStyle={{ backgroundColor: "white", width: "100%", height: 30, }}
                            lightTheme
                        />
                    </View>
                    <View>
                        <Text style={styles.requestListText}>
                            NGO List
                        </Text>
                    </View>
                    
                    <ScrollView style={styles.requestContainer}>
                    {loading ? <Text style={{ alignSelf: "center", fontSize: 20 }}>Loading..</Text> : <>
                        {ngo.reverse().map((rq,index) => {
                            return (
                                <NgoCard requestData={rq} key={index} />
                            )
                        })}
                    </>}

                    </ScrollView>
                </>
            )}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white"
    },
    requestContainer: {
        flexDirection: "column",
        flex: 1,
        margin: 15,
    },
    requestListText: {
        color: "#7D859D",
        fontSize: 18,
        fontWeight: "normal",
        paddingLeft: 25,
        paddingTop: 5
    },
    topBar: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginLeft: 15,
        marginTop: 15,
        marginRight: 15,

    }
})
