import React, { useState } from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import MessageScreen from './app/Screens/MessageScreen';
import LandingScreen from './app/Screens/LandingScreen';
import NgoListScreen from './app/Screens/NgoListScreen';
import ConfirmationScreen from './app/Screens/ConfirmationScreen';
import RequestDiscriptionScreen from './app/Screens/RequestDiscriptionScreen';
import ProfileScreen from './app/Screens/ProfileScreen';
import SigninScreen from './app/Screens/SigninScreen';
import SignupScreen from './app/Screens/SignupScreen';
import MenuBar from './app/Components/MenuBar';
import ChatScreen from './app/Screens/ChatScreen';

const Stack = createNativeStackNavigator();
const hideMenuBarOn = ["RequestDescriptionScreen", "SignupScreen", "SigninScreen", "MessageScreen", "ChatScreen"]

export default function App() {
  const [activeScreen, setActiveScreen] = useState()
  const displayMenuBar = hideMenuBarOn.indexOf(activeScreen) === -1


  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator screenListeners={{
          state: (e) => {
            // Do something with the state
            const index = e.data.state.index
            const screenName = e.data.state.routes[index].name
            setActiveScreen(screenName)
          },
        }}>
          <Stack.Screen name="SigninScreen" component={SigninScreen} options={{ headerShown: false, title: "" }} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false, title: "" }} />
          <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false, title: "" }} />
          <Stack.Screen name="NgoListScreen" component={NgoListScreen} options={{ headerShown: false, title: "" }} />
          <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} options={{ headerShown: false, title: "" }} />
          <Stack.Screen name="RequestDescriptionScreen" component={RequestDiscriptionScreen} options={{ headerShown: false, title: "" }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false, title: "" }} />
          <Stack.Screen name="MessageScreen" component={MessageScreen} options={{ headerShown: true, title: "Recent Chats" }} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: true, title: "" }} />
        </Stack.Navigator>
        {displayMenuBar && <MenuBar />}
      </NavigationContainer>
    </RootSiblingParent>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});
