import { useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePermissions } from './usePermissions';
import { Voximplant } from 'react-native-voximplant';

const useMakeCall = (username, incomingCall, isIncomingCall) => {

    const permissionsGranted = usePermissions();
    const navigation = useNavigation();

    const [callStatus, setCallStatus] = useState('Initializing...');
    const voximplant = Voximplant.getInstance();

    const call = useRef(incomingCall);

    useEffect(() => {
        if(!permissionsGranted){
            return;
        }

        const callSettings = {
            video: {
                sendVideo: true,
                receiveVideo: true
            }
        }

        const makeCall = async () => {
            call.current = await voximplant.call(username, callSettings);
            subscribeToCallEvents();
        }

        const answerCall = async () => {
            subscribeToCallEvents();
            call.current.answer(callSettings);
        }

        const subscribeToCallEvents = () => {
            call.current.on(Voximplant.CallEvents.Failed, callEvent => {
                showError(callEvent.reason);
            });

            call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
                setCallStatus('Calling...'); 
            });

            call.current.on(Voximplant.CallEvents.Connected, callEvent => {
                setCallStatus('Connected!');
            });

            call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
                navigation.navigate('Contacts');
            });
        }

        const showError = reason => {
            Alert.alert(
                'Call failed!', // Title
                `Reason: ${reason}`, // Description
                [ //Buttons
                    {
                        text: 'Ok',
                        onPress: navigation.navigate('Contacts'),
                    }
                ]
            );
        }

        if(isIncomingCall){
            answerCall();
        }else{
            makeCall();
        }

        return () => {
            call.current.off(Voximplant.CallEvents.Failed);
            call.current.off(Voximplant.CallEvents.ProgressToneStart);
            call.current.off(Voximplant.CallEvents.Connected);
            call.current.off(Voximplant.CallEvents.Disconnected);
        }


    }, [permissionsGranted]);

    return { callStatus, call };
}

export default useMakeCall;