import * as SecureStore from 'expo-secure-store';

export async function saveInStorage(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export async function getFromStorage(key) {
    const res = await SecureStore.getItemAsync(key);
    return `Bearer ${res}`
}


export function isLoggedIn(key) {
    return SecureStore.getItemAsync(key)
}

import { Linking, Alert, Platform } from 'react-native';

export const callNumber = phone => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phone}`;
    }
    else {
        phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
        .then(supported => {
            if (!supported) {
                Alert.alert('Phone number is not available Try copying instead');
            } else {
                return Linking.openURL(phoneNumber);
            }
        })
        .catch(err => console.log(err));
};