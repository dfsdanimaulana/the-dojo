import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAHgZUQvhpV-AuKDMSdPFYxV1ZHh21nFjU',
  authDomain: 'thedojosite-686bb.firebaseapp.com',
  projectId: 'thedojosite-686bb',
  storageBucket: 'thedojosite-686bb.appspot.com',
  messagingSenderId: '515089564943',
  appId: '1:515089564943:web:d3251777b84b6ca48daa7a',
}

initializeApp(firebaseConfig)

// init firestore
const db = getFirestore()

// init authentication
const auth = getAuth()

// init storage
const storage = getStorage()


export { db, auth, storage }

// user collection
// - any authenticated user can read and create
// - only user who "own/created" a document can update it (user id match)

// projects collection
// - any authenticated user can read, create and update a document
// - only users who "own/created" a document can delete it