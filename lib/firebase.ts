import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, signOut as firebaseSignOut, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCK_SC25tobvEgy1AaSf-yixl9KHrxYRzA',
    authDomain: 'peer-codex.firebaseapp.com',
    projectId: 'peer-codex',
    storageBucket: 'peer-codex.firebasestorage.app',
    messagingSenderId: '906455785777',
    appId: '1:906455785777:web:c10dbcc9075b89ee3a5010',
    measurementId: 'G-LG4F2CXYXC',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export const signUpWithEmail = async (email: string, password: string, name: string) => {
    if (!email.endsWith('@k12.friscoisd.org')) {
        throw new Error('Please use your Frisco ISD email address (@k12.friscoisd.org)')
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        await updateProfile(user, {
            displayName: name,
        })

        await sendEmailVerification(user)

        return user
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const signInWithEmail = async (email: string, password: string) => {
    if (!email.endsWith('@k12.friscoisd.org')) {
        throw new Error('Please use your Frisco ISD email address (@k12.friscoisd.org)')
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        if (!user.emailVerified) {
            await firebaseSignOut(auth)
            throw new Error('Please verify your email before signing in. Check your inbox for a verification link.')
        }

        return user
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const resetPassword = async (email: string) => {
    if (!email.endsWith('@k12.friscoisd.org')) {
        throw new Error('Please use your Frisco ISD email address (@k12.friscoisd.org)')
    }

    try {
        await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const signOut = () => firebaseSignOut(auth)
