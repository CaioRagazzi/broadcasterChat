import React, { useContext } from 'react';
import {
    Button
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import AuthContext from "../context/auth";

export default function CustomDrawer(props) {

    const { auth } = useContext(AuthContext)

    function logOut() {
        auth.signOutFirestore()
    }

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <Button title="Log out" onPress={() => logOut()}></Button>
        </DrawerContentScrollView>
    );
}