import { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const permissions = [
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.CAMERA,
];

export const usePermissions = () => {
    const [permissionGranted, setPermissionGranted] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const getPermissions = async () => {
            const granted = await PermissionsAndroid.requestMultiple(permissions);

            const cameraGranted = granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
            const recordAudioGranted = granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';

            if(!cameraGranted || !recordAudioGranted){
                navigation.navigate('Contacts');

                Alert.alert(
                    'Permissions not granted!',
                    'Allows the permissions for Camera and Microphone.',
                    [ //Buttons
                        {
                            text: 'Ok',
                        }
                    ]
                );
            }else{
                setPermissionGranted(true);
            }
        }

        if(Platform.OS === 'android'){
            getPermissions();
        }else{
            setPermissionGranted(true); //iOS
        }
    }, [permissions]);

    return permissionGranted;
}