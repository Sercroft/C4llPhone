import React, { useEffect } from "react";
import { FlatList, Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import dummyContacts from '../../../assets/data/contacts.json';
import { useNavigation, useRoute} from '@react-navigation/native';
import useContactFilter from "../../hooks/useContactFilter";
import { Voximplant } from 'react-native-voximplant';

const ContactsScreen = () => {
    const { searchTerm, setSearchTerm, filteredContacts } = useContactFilter(dummyContacts);
    
    const navigation = useNavigation();
    const route = useRoute();
    const currentUser = route?.params?.currentUser;
    

    const voximplant = Voximplant.getInstance();

    // Hook for Incoming Calls
    useEffect(() => {
        voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
            navigation.navigate('Incoming', {call: incomingCallEvent.call});
        });

        return () => {
            voximplant.off(Voximplant.ClientEvents.IncommingCall);
        }
    }, []);

    const callUser = (user) => {
        navigation.navigate('Calling', {user});
    }
    
    return(
        <View style={styles.page}>
            <View style={styles.containerCurrenUsername}>
                <Text>Welcome</Text>
                <Text style={styles.currentUsername}>{currentUser}!</Text>
            </View>

            <TextInput 
                value={searchTerm} 
                onChangeText={setSearchTerm} 
                placeholder="Search" 
                style={styles.searchInput}
            />

            <FlatList 
                data={filteredContacts} 
                renderItem={({item}) => (
                    <Pressable onPress={() => callUser(item)}>
                        <Text style={styles.contactName}>{item.name}</Text>
                    </Pressable>
                )}
                ItemSeparatorComponent={() => <View style={styles.separatorItem} />}
            />
      </View>
    );
}

const styles = StyleSheet.create({
    page: {
      padding: 15,
      backgroundColor: 'white',
      flex: 1
    },
    containerCurrenUsername: {
        alignItems: 'flex-end',
    },
    currentUsername: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contactName: {
      fontSize: 16,
      marginVertical: 10
    },
    separatorItem: {
      width: '100%',
      height: 1,
      backgroundColor: '#dedede'
    },
    searchInput: {
        backgroundColor: '#dedede',
        padding: 10,
        borderRadius: 6
    },
});

export default ContactsScreen;