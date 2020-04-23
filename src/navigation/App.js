import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Conversation from "../screens/Conversation";
import Contacts from "../screens/Contacts";


const Stack = createStackNavigator();

export default function App() {

    return (
        <Stack.Navigator initialRouteName="Contacts">
            <Stack.Screen name="Conversation" component={Conversation} />
            <Stack.Screen name="Contacts" component={Contacts} />
        </Stack.Navigator >
    );
}
