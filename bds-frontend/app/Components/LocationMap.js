import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default function LocationMap({ requestData }) {
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [loading, setLoading] = useState(false)
    const location = requestData?.location
    useEffect(() => {
        const getCoordinates = async () => {
            setLoading(true)
            try {
                const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?", {
                    params: {
                        address: location,
                        key: "AIzaSyBHUaM8fHC0RwRBGDTrk6QUVMIcmgTbQ1c"
                    }
                })
                setLat(response.data.results[0].geometry.location.lat)
                setLong(response.data.results[0].geometry.location.lng)

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)

            }
        }
        getCoordinates()
    }, [])

    return (
        <View style={styles.Map}>
            {loading ? <Text>
                loading ...
            </Text> :
                <MapView
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    loadingEnabled
                    initialRegion={{
                        // latitude: lat,
                        // longitude: long,
                        latitude: 31.5204,
                        longitude: 74.3587,
                        latitudeDelta: 1.0922,
                        longitudeDelta: 1.0421
                    }}
                >
                    <Marker coordinate={{
                        latitude: lat,
                        longitude: long,
                    }}
                        title={"Blood Request Location"}>
                    </Marker>
                </MapView>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    Map: {
        height: "60%",
        width: "100%",
        borderRadius: 15,
        padding: 15,
        borderRadius: 15
    }
})
