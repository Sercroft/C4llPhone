import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import useVoximplant from '../../hooks/useVoximplant';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useVoximplant(username, password);

    return(
        <View style={styles.page}>
            <TextInput 
                value={username} 
                onChangeText={setUsername} 
                placeholder='Username' 
                style={styles.input} 
            />
            <TextInput 
                value={password} 
                onChangeText={setPassword} 
                placeholder='Password' 
                style={styles.input} 
                secureTextEntry={true}
            />

            <Pressable style={styles.button} onPress={signIn}>
                <Text style={styles.txtButton}>Sign in!</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#dedede',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10
    },
    button: {
        backgroundColor: 'dodgerblue',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    txtButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default LoginScreen;