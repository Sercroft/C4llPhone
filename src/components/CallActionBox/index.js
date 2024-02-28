import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const CallActionBox = ({ onHangupPress }) => {

    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);

    const onReverseCamera = () => {
        console.warn('Reverse')
    }

    const onToggleCamera = () => {
        setIsCameraOn(currentValue => !currentValue);
    }

    const onToggleMicrophone = () => {
        setIsMicOn(currentValue => !currentValue);
    }

    return(
        <View style={styles.buttonsContainer}>
            <Pressable 
                onPress={onReverseCamera}
                style={styles.iconButton}
            >
                <Ionicons 
                    name='camera-reverse' 
                    size={30} 
                    color={'white'}
                />
            </Pressable>

            <Pressable 
                onPress={onToggleCamera}
                style={styles.iconButton}
            >
                <MaterialIcons 
                    name={isCameraOn ? 'videocam-off' : 'videocam'} 
                    size={30} 
                    color={'white'}
                />
            </Pressable>

            <Pressable 
                onPress={onToggleMicrophone}
                style={styles.iconButton}
            >
                <MaterialIcons 
                    name={isMicOn ? 'mic-off' : 'mic'} 
                    size={30} 
                    color={'white'}
                />
            </Pressable>

            <Pressable 
                onPress={onHangupPress}
                style={[styles.iconButton, { backgroundColor: 'red' }]}
            >
                <MaterialIcons 
                    name='call-end' 
                    size={30} 
                    color={'white'}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        backgroundColor: '#333333',
        padding: 20,
        paddingBottom: 30,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto'
    },
    iconButton: {
        backgroundColor: '#4a4a4a',
        padding: 10,
        borderRadius: 50
    }
});

export default CallActionBox;