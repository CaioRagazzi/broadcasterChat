import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const App = () => {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .onSnapshot(onResult, onError);
    return () => subscriber();
  }, [])

  function onResult(querySnapshot) {

    querySnapshot.docChanges().map(item => {
      console.log(messages);

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
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView style={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <FlatList
            data={messages}
            renderItem={({ item }) => {
              return <Text>{item.doc.data().message}</Text>
            }}
            keyExtractor={item => item.doc.data().id}
          />
        </View>
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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

export default App;
