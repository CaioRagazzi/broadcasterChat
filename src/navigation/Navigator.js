import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Conversation from "../screens/Conversation";
import Login from "../screens/Login";
import CustomDrawer from "./CustomDrawer";

import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Navigator() {

    const [user, setUser] = useState();
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    function home() {
        return (
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
                <Drawer.Screen name="conversation" component={Conversation} />
            </Drawer.Navigator >
        )
    }

    function login() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
            </Stack.Navigator>
        )
    }


    return (
        user ?
            home() :
            login()
    );
}

export default Navigator;