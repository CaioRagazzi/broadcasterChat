import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView, KeyboardAvoidingView, TextInput, Button, ActivityIndicator } from 'react-native'

import firestore from '@react-native-firebase/firestore';

const SearchContacts = ({ navigation }) => {

    const isMounted = useRef(false);
    const [emailInput, setEmailInput] = useState('')
    const [searchedUserName, setSearchedUserName] = useState('')
    const [searchedUid, setSearchedUid] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isMounted.current) {
            async function findEmail() {
                setLoading(true)
                const response = await firestore()
                    .collection('users')
                    .where('email', '==', emailInput.toLowerCase().trim())
                    .get()
                if (response.docs.length !== 0) {
                    setLoading(false)
                    setSearchedUserName(response.docs[0].data().userName);
                    setSearchedUid(response.docs[0].data().uid);
                } else {
                    setLoading(false)
                    setSearchedUserName('');
                    setSearchedUid('');
                }
                setLoading(false)
            }
            findEmail()
        } else {
            isMounted.current = true;
        }
    }, [emailInput])

    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} >
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setEmailInput(text)}
                    value={emailInput}
                />
                {
                    loading ?
                        <ActivityIndicator size="large" color="#0000ff" /> :
                        searchedUserName === '' ?
                            null :
                            <Button title={searchedUserName} onPress={() => navigation.navigate('Conversation', { friendUid: searchedUid })}></Button>
                }
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SearchContacts
