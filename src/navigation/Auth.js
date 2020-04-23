import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from "../screens/Login";

const Stack = createStackNavigator();

export default function Auth() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
