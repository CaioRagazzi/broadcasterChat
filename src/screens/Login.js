import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity, TextInput, Text, StyleSheet, SafeAreaView, View } from 'react-native'


const Login = ({ navigation }) => {

    const isMountedEmail = useRef(false);
    const isMountedPassword = useRef(false);

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [emailError, setEmailError] = useState(true)
    const [password, setPassword] = useState("")
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [passwordError, setpasswordError] = useState(true)
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        if (isMountedEmail.current) {
            checkEmail()
        } else {
            isMountedEmail.current = true;
        }
    }, [email])

    useEffect(() => {
        if (isMountedPassword.current) {
            checkPassword()
        } else {
            isMountedPassword.current = true;
        }
    }, [password])

    function checkEmail() {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailErrorMessage('Invalid E-mail')
            setEmailError(true)
        } else {
            setEmailErrorMessage('')
            setEmailError(false)
        }
    }

    function checkPassword() {
        if (password.length == 0) {
            setPasswordErrorMessage('Password is required')
            setpasswordError(true)
        } else if (password.length < 6) {
            setPasswordErrorMessage('Password should be at least 6 characteres')
            setpasswordError(true)
        } else {
            setPasswordErrorMessage('')
            setpasswordError(false)
        }
    }

    function emailPasswordSignIn() {

        setLoading(true)
        checkEmail();
        checkPassword();
        if (emailError || passwordError) {
            return
        }
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate('Conversation')
                setLoading(false)
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setEmailErrorMessage('That email address is already in use!')
                }

                if (error.code === 'auth/invalid-email') {
                    setEmailErrorMessage('That email address is invalid!')
                }

                if (error.code === 'auth/user-not-found') {
                    setEmailErrorMessage('There is no user record corresponding to this identifier. The user may have been deleted.')
                }

                if (error.code === 'auth/wrong-password') {
                    setPasswordErrorMessage('The password is invalid.')
                }

                console.log(error);
                setLoading(false)
            });
    }

    async function googleSignIn() {
        setLoading(false)
        GoogleSignin.configure({
            webClientId: '486232265989-o9vmtakqb5j9i7aqi81t5un7g2kietml.apps.googleusercontent.com',
        });

        const { idToken } = await GoogleSignin.signIn();

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        auth()
            .signInWithCredential(googleCredential).then(() => {
                navigation.navigate('Conversation')
                setLoading(false)
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setEmailErrorMessage('That email address is already in use!')
                }

                if (error.code === 'auth/invalid-email') {
                    setEmailErrorMessage('That email address is invalid!')
                }

                if (error.code === 'auth/user-not-found') {
                    setEmailErrorMessage('There is no user record corresponding to this identifier. The user may have been deleted.')
                }
                console.log(error);
                setLoading(false)
            });
    }

    return (
        <SafeAreaView style={styles.container} >
            <TextInput
                style={styles.inputText}
                onChangeText={(val) => setEmail(val.trim())}
                placeholder="Email"
                value={email}
                autoCapitalize="none"
            />
            {emailErrorMessage ?
                <Text style={{ fontSize: 10, color: 'red', paddingLeft: 2, paddingBottom: 5 }}>{emailErrorMessage}</Text> :
                null
            }
            <TextInput
                style={styles.inputText}
                onChangeText={(val) => setPassword(val)}
                placeholder="Password"
                value={password}
                secureTextEntry={true}
            />
            {passwordErrorMessage ?
                <Text style={{ fontSize: 10, color: 'red', paddingLeft: 2, paddingBottom: 5 }}>{passwordErrorMessage}</Text> :
                null
            }
            <TouchableOpacity
                style={styles.button}
                onPress={() => emailPasswordSignIn()}>
                <Text>Go</Text>
            </TouchableOpacity>
            <GoogleSigninButton
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => googleSignIn()} />
        </SafeAreaView>
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
        backgroundColor: '#add8e6',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 10,
        paddingBottom: 5
    },
    googleButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '100%',
        borderRadius: 10,
        paddingBottom: 5
    }
})

export default Login
