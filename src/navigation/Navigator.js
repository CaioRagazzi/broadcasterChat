import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Conversation from "../screens/Conversation";
import Login from "../screens/Login";

const Stack = createStackNavigator();

function Navigator() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerStyle: { backgroundColor: 'red' }, headerTintColor: '#fff' }}>
            <Stack.Screen name="Conversation" component={Conversation} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}

export default Navigator;