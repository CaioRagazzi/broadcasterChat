import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

import Conversation from "../screens/Conversation";
import Login from "../screens/Login";
import Contacts from "../screens/Contacts";

import CustomDrawer from "./CustomDrawer";


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
            <Stack.Navigator initialRouteName="contacts">
                <Stack.Screen name="conversation" component={Conversation} />
                <Stack.Screen name="contacts" component={Contacts} />
            </Stack.Navigator >
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
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
                <Drawer.Screen name="home" component={home} />
            </Drawer.Navigator> :
            login()
    );
}

export default Navigator;