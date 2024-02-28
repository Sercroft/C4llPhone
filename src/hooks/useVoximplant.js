import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Voximplant } from 'react-native-voximplant';
import { APP_NAME, ACC_NAME } from '../Constants';
import { Alert } from 'react-native';

const useVoximplant = (username, password) => {
    const [currentUser, setCurrentUser] = useState('');
    const navigation = useNavigation();
    const voximplant = Voximplant.getInstance();

    
    useEffect(() => {
        const connect = async () => {
            const status = await voximplant.getClientState();

            console.log(status)

            if(status === Voximplant.ClientState.DISCONNECTED){
                await voximplant.connect();
            }else if(status === Voximplant.ClientState.LOGGED_IN){
                redirectHome();
            }
        }
        connect();
    }, [voximplant]);

    const signIn = async () => {
        try{
            const fqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
            await voximplant.login(fqUsername, password);

            redirectHome();
        }catch(error){
            console.log('Sign in error: ' + JSON.stringify(error));
            Alert.alert(error.name, `Error code: ${error.code}`);
        }
    }

    const redirectHome = () => {
        setCurrentUser(username);
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'Contacts',
                    params: { currentUser: username }
                }
            ]
        });
    }

    return { signIn, currentUser };
}

export default useVoximplant;