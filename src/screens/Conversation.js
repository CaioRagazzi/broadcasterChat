import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    View,
    Text,
    KeyboardAvoidingView
} from 'react-native';

import Message from "../components/Message";

import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import auth from '@react-native-firebase/auth';

const Conversation = () => {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const flatList = useRef(null);

    useEffect(() => {
        const subscriber = firestore()
            .collection('chats')
            .onSnapshot(onResult, onError);
        return () => subscriber();
    }, [])

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber;
    // }, []);

    // function onAuthStateChanged(user) {
    //     console.log(user);
        
    //     setUser(user);
    //     if (initializing) setInitializing(false);
    // }

    function onResult(querySnapshot) {
        querySnapshot.docChanges().map(item => {
            switch (item.type) {
                case 'added':
                    addMessage(item)
                    break;
                case 'removed':
                    removeMessage(item)
                    break;
            }
        })
    }

    function removeMessage(documentChange) {
        setMessages(oldMessages => oldMessages.filter(item => {
            return item.doc.data().id !== documentChange.doc.data().id
        }))
    }

    function addMessage(documentChange) {
        setMessages(oldMessages => [...oldMessages, documentChange])
    }

    function onError(error) {
        console.error(error);
    }

    function createMessage() {
        if (message.trim() === '') {
            return
        }
        firestore()
            .collection('chats')
            .doc()
            .set({
                id: uuid.v4(),
                author: 'caio',
                message,
                created: new Date()
            })
        setMessage('')
    }

    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}
            >
                <FlatList
                    ref={flatList}
                    onContentSizeChange={() => flatList.current.scrollToEnd()}
                    onLayout={(event) => flatList.current.scrollToEnd()}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                    data={messages}
                    initialScrollIndex={0}
                    renderItem={({ item }) => {
                        return <Message data={item.doc.data()} />
                    }}
                    keyExtractor={item => item.doc.data().id}
                />
                <View style={styles.mensagemContainer}>
                    <TextInput
                        style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setMessage(text)}
                        value={message}
                    />
                    <TouchableOpacity
                        style={styles.customButton}
                        onPress={() => { createMessage() }}
                        accessibilityLabel="Send"
                    >
                        <Text style={{ color: 'white' }}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mensagemContainer: {
        flexDirection: 'row'
    },
    customButton: {
        width: '20%',
        height: '100%',
        backgroundColor: "#841584",
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    }
});

export default Conversation;