import React from 'react';
import {
    Button
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

export default function CustomDrawer(props) {

    function logOut() {
        auth()
            .signOut()
            .then(() => {
                props.navigation.closeDrawer()
                
            })
    }

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <Button title="Log out" onPress={() => logOut()}></Button>
        </DrawerContentScrollView>
    );
}