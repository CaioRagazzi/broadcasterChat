import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from "./CustomDrawer";

import AuthContext from "../context/auth";

import AuthRoute from "./Auth";
import AppRoute from "./App";

const Drawer = createDrawerNavigator();

const Index = () => {

    const { auth } = useContext(AuthContext)

    return (
        auth.signed ?
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
                <Drawer.Screen name="App" component={AppRoute} />
            </Drawer.Navigator> :
            <AuthRoute />
    )
}

export default Index
