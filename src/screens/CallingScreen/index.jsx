import React from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import CallActionBox from "../../components/CallActionBox";
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useMakeCall from "../../hooks/useMakeCall";


const CallingScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { user, call: incomingCall, isIncomingCall } = route?.params;

    console.log(`RP: ${JSON.stringify(route?.params)} | USER: ${JSON.stringify(user)}`);

    const { callStatus, call } = useMakeCall(user?.name, incomingCall, isIncomingCall);

    const back = () => {
        navigation.goBack(); 
    }

    const onHangUpPress = () => {
        if(call.current){
            call.current.hangup();
        }
    }

    return(
        <View style={styles.page}>
            <Pressable onPress={back} style={styles.backButton}>
                <Ionicons 
                    name='chevron-back-outline' 
                    size={25} 
                    color={'white'}
                />
            </Pressable>

            <View style={styles.preview}>
                <Text style={styles.name}>{user?.display_name}</Text>
                <Text style={styles.phoneNumber}>{callStatus}</Text>
            </View>

            <CallActionBox onHangupPress={onHangUpPress} />
        </View>    
    );
}

const styles= StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: '#7b4e80'
    },
    preview: {
        backgroundColor: '#7b4e80',
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 10
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 50,
        marginBottom: 16
    },
    phoneNumber: {
        fontSize: 20,
        color: 'white'
    },
    bgBtn: {
        backgroundColor: 'red'
    },
    backButton: {
        position: 'absolute',
        zIndex: 1,
        top: 10,
        left: 8
    }
}); 

export default CallingScreen;