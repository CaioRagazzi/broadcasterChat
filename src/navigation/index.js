import React, { useState, useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from "./CustomDrawer";
import auth from '@react-native-firebase/auth';

import AuthRoute from "./Auth";
import AppRoute from "./App";

const Drawer = createDrawerNavigator();

const Index = () => {

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

    return (
        user ?
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
                <Drawer.Screen name="App" component={AppRoute} />
            </Drawer.Navigator> :
            <AuthRoute />
    )
}

export default Index
