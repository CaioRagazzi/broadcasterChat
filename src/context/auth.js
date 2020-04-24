import React, { createContext, useState } from "react";

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

const AuthContext = createContext({ signed: false, emailPasswordSignIn: null, googleSignIn: null, signOutFirestore: null });

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

    function emailPasswordSignIn(email, password) {

        setLoading(true)
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response)
                setUser(response.user)
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
            .then(() => setUser(null))
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, emailPasswordSignIn, googleSignIn, signOutFirestore }}>
            {
                children
            }
        </AuthContext.Provider>
    )
}

export default AuthContext;

