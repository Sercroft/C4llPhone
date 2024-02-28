import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactsScreen from '../screens/ContactScreen';
import CallScreen from '../screens/CallScreen';
import CallingScreen from '../screens/CallingScreen';
import IncomingCallScreen from '../screens/IncomingCallScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const NavBar = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Group 
                    screenOptions={{ headerShown: false }} // Hide the title stack screen
                >
                    <Stack.Screen name='Login' component={LoginScreen} />
                    <Stack.Screen name='Contacts' component={ContactsScreen} />
                    <Stack.Screen name='Call' component={CallScreen} />
                    <Stack.Screen name='Calling' component={CallingScreen} />
                    <Stack.Screen name='Incoming' component={IncomingCallScreen} />
                </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default NavBar;