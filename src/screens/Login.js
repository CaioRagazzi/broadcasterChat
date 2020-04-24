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

    const { signed, emailPasswordSignIn, googleSignIn } = useContext(AuthContext)

    const isMountedEmail = useRef(false);
    const isMountedPassword = useRef(false);

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [emailError, setEmailError] = useState(true)
    const [password, setPassword] = useState("")
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [passwordError, setpasswordError] = useState(true)

    console.log(signed);
    

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

    function emailPasswordLogin() {

        checkEmail();
        checkPassword();
        if (emailError || passwordError) {
            return
        }
        Keyboard.dismiss()

        emailPasswordSignIn(email, password)


    }

    async function googleLogin() {
        console.log('google signin');

    }

    return (
        <>
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
                    onPress={() => emailPasswordLogin()}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign In</Text>
                </TouchableOpacity>
                <GoogleSigninButton
                    style={styles.googleButton}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => googleLogin()} />

            </SafeAreaView>
            {
                loading ?
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
