import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const App = () => {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(null)

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .onSnapshot(onResult, onError);
    return () => subscriber();
  }, [])

  function onResult(collectionSnapshot) {
    // setMessages(collectionSnapshot)
    console.log(collectionSnapshot.forEach(element => {
      console.log(element);
      
    }))
  }

  function onError(error) {
    console.error(error);
  }

  function createMessage() {
    firestore()
      .collection('chats')
      .doc()
      .set({
        author: 'caio',
        message
      })
  }

  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView style={{ flexGrow: 1 }}>
        <ScrollView contentContainerStyle={styles.container}
          contentInsetAdjustmentBehavior="automatic">

        </ScrollView>
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
