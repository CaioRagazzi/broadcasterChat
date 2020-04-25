import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from "react-native";

import Conversation from "../screens/Conversation";
import Contacts from "../screens/Contacts";
import SearchContacts from "../screens/SearchContacts";


const Stack = createStackNavigator();

export default function App() {

    return (
        <Stack.Navigator initialRouteName="Contacts">
            <Stack.Screen name="Conversation" component={Conversation} />
            <Stack.Screen name="Contacts" component={Contacts} />
            <Stack.Screen name="SearchContacts" component={SearchContacts} />
        </Stack.Navigator >
    );
}
