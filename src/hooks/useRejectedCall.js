import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Voximplant } from 'react-native-voximplant';

export const useRejectedCall = (call) => {
    const [caller, setCaller] = useState('');

    const navigation = useNavigation();

    
    useEffect(() => {
        setCaller(call.getEndpoints()[0].displayName);

        // Redirect to Contacts screen when the call is rejected
        call.on(Voximplant.CallEvents.Disconnected, callEvent => {
            navigation.navigate('Contacts');
        });

        console.log(`caller: ${caller}`)

        return () => {
            call.off(Voximplant.CallEvents.Disconnected);
        }
    }, [caller]);

    return { caller };
}