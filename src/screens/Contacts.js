import React, { useEffect, useState, useRef, useContext, useLayoutEffect } from 'react'
import { SafeAreaView, Text, KeyboardAvoidingView, Button } from 'react-native'

import AuthContext from "../context/auth";

import firestore from '@react-native-firebase/firestore';

const Contacts = ({ navigation }) => {

    const { auth } = useContext(AuthContext)

    const isMounted = useRef(false);
    const [chats, setChats] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => { navigation.navigate("SearchContacts") }} title="Search" />
            ),
        });
    }, [navigation])

    // useEffect(() => {
    //     if (isMounted.current) {
    //         var subscriberFirestore = firestore()
    //             .doc(`users/${auth.user.uid}`)
    //             .collection('chatting')
    //             .onSnapshot(onResult, onError);
    //     } else {
    //         isMounted.current = true;
    //     }

    //     return () => {
    //         if (subscriberFirestore) {
    //             subscriberFirestore()
    //         }
    //     }
    // }, [auth.user])

    useEffect(() => {
        createProfileIfHasnt();
    }, [])

    async function createProfileIfHasnt() {
        const profile = await firestore()
            .doc(`users/${auth.user.user.uid}`)
            .get()

        if (profile.data() === undefined) {
            firestore()
                .doc(`users/${auth.user.user.uid}`)
                .set({
                    userName: auth.user.user.displayName === null ? auth.user.user.email.match(/^([^@]*)@/)[1] : auth.user.user.displayName,
                    email: auth.user.user.email,
                    uid: auth.user.user.uid
                })
        }
    }

    function onResult(querySnapshot) {
        setChats([])
        for (let key in querySnapshot.data()) {
            setChats(oldChats => [...oldChats, { id: key, data: querySnapshot.data()[key] }])
        }
    }

    function onError(error) {
        console.error(error);
    }

    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} >
                {
                    chats.map(item => {
                        return (
                            <Button key={item.id} title={item.data} onPress={() => { navigation.navigate('Conversation', { conversation: item.data }) }}></Button>
                        )
                    })
                }
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Contacts
