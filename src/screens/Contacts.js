import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, Text, KeyboardAvoidingView, Button } from 'react-native'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Contacts = ({ navigation }) => {

    const isMounted = useRef(false);
    const [user, setUser] = useState();
    const [initializing, setInitializing] = useState(true);
    const [chats, setChats] = useState([])

    useEffect(() => {
        const subscriberAuth = auth().onAuthStateChanged(onAuthStateChanged);
        return () => {
            subscriberAuth()
        }
    }, [])

    useEffect(() => {
        if (isMounted.current) {
            var subscriberFirestore = firestore()
                .collection(`users/allUsers/${user.uid}`)
                .doc('chatting')
                .onSnapshot(onResult, onError);
        } else {
            isMounted.current = true;
        }

        return () => {
            if (subscriberFirestore) {
                subscriberFirestore()
            }
        }
    }, [user])

    function onResult(querySnapshot) {
        setChats([])
        for (let key in querySnapshot.data()) {
            setChats(oldChats => [...oldChats, { id: key, data: querySnapshot.data()[key] }])
        }
    }

    function onError(error) {
        console.error(error);
    }

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} >
                <Text>asdasdasd</Text>
                {
                    chats.map(item => {
                        return (
                            <Button key={item.id} title={item.data}></Button>
                        )
                    })
                }
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Contacts
