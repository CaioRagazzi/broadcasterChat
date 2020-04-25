import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

import React, { useState, useEffect, useRef, useContext } from 'react'
import {
    TouchableOpacity,
    TextInput,
    Text,
    StyleSheet,
    SafeAreaView,
    View,
    Dimensions,
    ActivityIndicator,
    Keyboard
} from 'react-native'
import AuthContext from "../context/auth";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Login = ({ navigation }) => {

    const { auth } = useContext(AuthContext)

    const isMountedEmail = useRef(false);
    const isMountedPassword = useRef(false);

    useEffect(() => {
        if (isMountedEmail.current) {
            auth.checkEmail()
        } else {
            isMountedEmail.current = true;
        }
    }, [auth.email])

    useEffect(() => {
        if (isMountedPassword.current) {
            auth.checkPassword()
        } else {
            isMountedPassword.current = true;
        }
    }, [auth.password])

    function emailPasswordLogin() {

        auth.checkEmail();
        auth.checkPassword();
        if (auth.emailError || auth.passwordError) {
            return
        }
        Keyboard.dismiss()

        auth.emailPasswordSignIn()
    }

    async function googleLogin() {
        auth.googleSignIn()
    }

    return (
        <>
            <SafeAreaView style={styles.container} >
                <TextInput
                    style={styles.inputText}
                    onChangeText={(val) => auth.setEmail(val.trim())}
                    placeholder="Email"
                    value={auth.email}
                    autoCapitalize="none"
                />
                {auth.emailErrorMessage ?
                    <Text style={{ fontSize: 10, color: 'red', paddingLeft: 2, paddingBottom: 5 }}>{auth.emailErrorMessage}</Text> :
                    null
                }
                <TextInput
                    style={styles.inputText}
                    onChangeText={(val) => auth.setPassword(val)}
                    placeholder="Password"
                    value={auth.password}
                    secureTextEntry={true}
                />
                {auth.passwordErrorMessage ?
                    <Text style={{ fontSize: 10, color: 'red', paddingLeft: 2, paddingBottom: 5 }}>{auth.passwordErrorMessage}</Text> :
                    null
                }
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => emailPasswordLogin()}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign In</Text>
                </TouchableOpacity>
                <GoogleSigninButton
                    style={styles.googleButton}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => googleLogin()} />

            </SafeAreaView>
            {
                auth.loading ?
                    <View style={styles.overlay}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View> :
                    null
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 20
    },
    inputText: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#4285F4',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 43,
        width: '97%',
        paddingBottom: 5,
        borderRadius: 2
    },
    googleButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '100%',
        borderRadius: 10,
        paddingBottom: 5
    },
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: windowWidth,
        height: windowHeight
    }
})

export default Login
