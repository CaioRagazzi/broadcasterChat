import React, { createContext, useState } from "react";

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState("")
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [emailError, setEmailError] = useState(true)
    const [password, setPassword] = useState("")
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [passwordError, setpasswordError] = useState(true)

    function emailPasswordSignIn() {

        setLoading(true)
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response)
                setUser(response)
                setLoading(false)
                setEmail('')
                setPassword('')
            })
            .catch(error => {
                console.log(error);

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
                setLoading(false)
            });
    }

    async function googleSignIn() {
        setLoading(true)

        GoogleSignin.configure({
            webClientId: '486232265989-o9vmtakqb5j9i7aqi81t5un7g2kietml.apps.googleusercontent.com',
        });

        const { idToken } = await GoogleSignin.signIn();

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        auth()
            .signInWithCredential(googleCredential)
            .then(response => {
                console.log(response)
                setUser(response)
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
                setLoading(false)
            });
    }

    function signOutFirestore() {
        auth()
            .signOut()
            .then((response) => {
                console.log(response);

                setUser(null)
            })
    }

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

    return (
        <AuthContext.Provider value={{
            auth: {
                signed: !!user,
                user,
                emailPasswordSignIn,
                googleSignIn,
                signOutFirestore,
                loading,
                emailErrorMessage,
                passwordErrorMessage,
                email,
                setEmail,
                password,
                setPassword,
                checkEmail,
                checkPassword,
                emailError,
                passwordError
            }
        }}>
            {
                children
            }
        </AuthContext.Provider>
    )
}

export default AuthContext;

