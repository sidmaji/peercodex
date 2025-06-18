import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { addDoc, collection, doc, enableNetwork, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'

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
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: 'select_account',
})

export const firebaseAuth = {
    auth,
    signInWithEmail: (email, password) => signInWithEmailAndPassword(auth, email, password),
    signUpWithEmail: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    signInWithGoogle: () => signInWithPopup(auth, googleProvider),
    signOut: () => signOut(auth),
    sendPasswordReset: (email) => sendPasswordResetEmail(auth, email),
    sendEmailVerification: (user) => sendEmailVerification(user),
    onAuthStateChanged: (callback) => onAuthStateChanged(auth, callback),
}

export const firestore = {
    getUserProfile: async (userId) => {
        try {
            const docRef = doc(db, 'users', userId)
            const docSnap = await getDoc(docRef)
            return docSnap.exists() ? docSnap.data() : null
        } catch (error) {
            console.warn('Firestore getUserProfile error:', error.message)
            if (error.code === 'unavailable' || error.message.includes('offline')) {
                return null
            }
            throw error
        }
    },

    setUserProfile: async (userId, data) => {
        try {
            const docRef = doc(db, 'users', userId)
            await setDoc(docRef, { ...data, updatedAt: new Date() }, { merge: true })
            return true
        } catch (error) {
            console.warn('Firestore setUserProfile error:', error.message)
            if (error.code === 'unavailable' || error.message.includes('offline')) {
                localStorage.setItem(`userProfile_${userId}`, JSON.stringify(data))
                return false
            }
            throw error
        }
    },

    updateUserProfile: async (userId, data) => {
        try {
            const docRef = doc(db, 'users', userId)
            await updateDoc(docRef, { ...data, updatedAt: new Date() })
            return true
        } catch (error) {
            console.warn('Firestore updateUserProfile error:', error.message)
            if (error.code === 'unavailable' || error.message.includes('offline')) {
                const existing = localStorage.getItem(`userProfile_${userId}`)
                const profile = existing ? JSON.parse(existing) : {}
                localStorage.setItem(`userProfile_${userId}`, JSON.stringify({ ...profile, ...data }))
                return false
            }
            throw error
        }
    },

    getMentors: async () => {
        try {
            const usersRef = collection(db, 'users')
            const q = query(usersRef, where('roles', 'array-contains', 'mentor'))
            const querySnapshot = await getDocs(q)

            const mentors = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                if (data.mentorOffers && data.mentorOffers.length > 0) {
                    mentors.push(data)
                }
            })

            return mentors
        } catch (error) {
            console.warn('Firestore getMentors error:', error.message)
            return []
        }
    },

    createMentorRequest: async (requestData) => {
        try {
            const requestsRef = collection(db, 'mentorRequests')
            await addDoc(requestsRef, requestData)
            return true
        } catch (error) {
            console.warn('Firestore createMentorRequest error:', error.message)
            if (error.code === 'unavailable' || error.message.includes('offline')) {
                // Store locally for offline support
                const requests = JSON.parse(localStorage.getItem('pendingMentorRequests') || '[]')
                requests.push({ ...requestData, id: Date.now() })
                localStorage.setItem('pendingMentorRequests', JSON.stringify(requests))
                return false
            }
            throw error
        }
    },

    getMentorRequests: async (userId) => {
        try {
            const requestsRef = collection(db, 'mentorRequests')
            const q = query(
                requestsRef,
                where('to', '==', userId)
                // Removed orderBy to avoid index requirement for now
            )
            const querySnapshot = await getDocs(q)

            const requests = []
            querySnapshot.forEach((doc) => {
                requests.push({ id: doc.id, ...doc.data() })
            })

            // Sort on client side by timestamp
            return requests.sort((a, b) => {
                const timeA = a.timestamp?.seconds || a.timestamp?.getTime?.() || 0
                const timeB = b.timestamp?.seconds || b.timestamp?.getTime?.() || 0
                return timeB - timeA
            })
        } catch (error) {
            console.warn('Firestore getMentorRequests error:', error.message)
            return []
        }
    },

    updateMentorRequestStatus: async (requestId, status) => {
        try {
            const requestRef = doc(db, 'mentorRequests', requestId)
            await updateDoc(requestRef, {
                status,
                updatedAt: new Date(),
            })
            return true
        } catch (error) {
            console.warn('Firestore updateMentorRequestStatus error:', error.message)
            return false
        }
    },
}

// Initialize Firestore with offline persistence
try {
    enableNetwork(db)
} catch (error) {
    console.warn('Could not enable Firestore network:', error)
}
