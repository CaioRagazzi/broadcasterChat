import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView, KeyboardAvoidingView, TextInput, Button, ActivityIndicator } from 'react-native'

import firestore from '@react-native-firebase/firestore';

const SearchContacts = () => {

    const isMounted = useRef(false);
    const [emailInput, setEmailInput] = useState('')
    const [searched, setSearched] = useState('')
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
                    setSearched(response.docs[0].data().userName);
                } else {
                    setLoading(false)
                    setSearched('');
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
                        searched === '' ?
                            null :
                            <Button title={searched}></Button>
                }
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SearchContacts
