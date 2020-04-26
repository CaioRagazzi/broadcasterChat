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

import uuid from 'react-native-uuid';

const Conversation = ({ navigation }) => {

    const isMounted = useRef(false);
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [profile, setProfile] = useState({})

    const flatList = useRef(null);

    useEffect(() => {
        if (isMounted.current) {
            var subscriberFirestore = firestore()
                .collection(`conversations/allConversations/${conversation}`)
                .orderBy('created', 'asc')
                .onSnapshot(onResult, onError);
            getProfile()
        } else {
            isMounted.current = true;
        }

        return () => {
            if (subscriberFirestore) {
                subscriberFirestore()
            }
        }
    }, [user])

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    async function getProfile() {
        const profile = await firestore()
            .collection(`users/allUsers/${user.uid}`)
            .doc('profile')
            .get()
        console.log(profile.data());

        if (profile.exists) {
            setProfile(profile.data())
        }
    }

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
            .collection(`conversations/allConversations/${conversation}`)
            .doc()
            .set({
                id: uuid.v4(),
                author: !profile.userName ? user.displayName : profile.userName,
                authorId: user.uid,
                message,
                created: new Date()
            })
        setMessage('')
    }

    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <FlatList
                    ref={flatList}
                    onContentSizeChange={() => flatList.current.scrollToEnd()}
                    onLayout={(event) => flatList.current.scrollToEnd()}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                    data={messages}
                    initialScrollIndex={0}
                    renderItem={({ item }) => {
                        return <Message data={item.doc.data()} loggedUserId={user.uid} />
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