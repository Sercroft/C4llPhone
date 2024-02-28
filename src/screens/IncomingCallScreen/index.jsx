import React from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import bg from '../../../assets/images/bg-incoming-call.jpeg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRejectedCall } from "../../hooks/useRejectedCall";

const IncomingCallScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { call } = route.params;

    const { caller } = useRejectedCall(call);

    const onDecline = () => {
        call.decline();
        navigation.navigate('Contacts');
    }

    const onAccept = () => {
        navigation.navigate('Calling', {
            call, 
            isIncomingCall: true // User is on a call 
        });
    }

    return(
        <ImageBackground style={styles.bg} source={bg} resizeMode='cover'>
            <Text style={styles.name}>{caller}</Text>
            <Text style={styles.phoneNumber}>C4llPhone video</Text>

            <View style={[styles.row, { marginTop: 'auto'} ]}>
                <View style={styles.iconContainer}>
                    <Ionicons name='alarm' size={30} color={'white'}/>
                    <Text style={styles.iconText}>Remind me</Text>
                </View>
                
                <View style={styles.iconContainer}>
                    <Ionicons name='chatbubble' size={30} color={'white'}/>
                    <Text style={styles.iconText}>Message</Text>
                </View>
            </View>

            <View style={styles.row}>
                <Pressable 
                    onPress={onDecline} 
                    style={styles.iconContainer}
                >
                    <View style={styles.iconButtonContainer}>
                        <MaterialIcons name='close' size={45} color={'white'}/>
                    </View>
                    <Text style={styles.iconText}>Decline</Text>
                </Pressable>
                
                <Pressable 
                    onPress={onAccept} 
                    style={styles.iconContainer}
                >
                    <View style={[styles.iconButtonContainer, { backgroundColor: '#2e7bff' }]}>
                        <MaterialIcons name='check' size={45} color={'white'}/>
                    </View>
                    <Text style={styles.iconText}>Accept</Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconContainer: {
        alignItems: 'center',
        marginVertical: 20
    },
    iconButtonContainer: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 50,
        margin: 10
    },
    iconText: {
        color: 'white',
        marginTop: 8
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 100,
        marginBottom: 16
    },
    phoneNumber: {
        fontSize: 20,
        color: 'white'
    },
    bg: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        paddingBottom: 45
    }
});

export default IncomingCallScreen;