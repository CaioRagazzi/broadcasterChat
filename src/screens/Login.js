import React from 'react'
import { View, Text, Button } from 'react-native'

const Login = ({ navigation }) => {
    return (
        <View>
            <Text>Login</Text>
            <Button title="Go" onPress={() => { navigation.navigate('Conversation') }}></Button>
        </View>
    )
}

export default Login
