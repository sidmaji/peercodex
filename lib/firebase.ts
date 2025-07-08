import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, signOut as firebaseSignOut, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
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
