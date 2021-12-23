import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAHgZUQvhpV-AuKDMSdPFYxV1ZHh21nFjU',
  authDomain: 'thedojosite-686bb.firebaseapp.com',
  projectId: 'thedojosite-686bb',
  storageBucket: 'thedojosite-686bb.appspot.com',
  messagingSenderId: '515089564943',
  appId: '1:515089564943:web:d3251777b84b6ca48daa7a',
}

firebase.initializeApp(firebaseConfig)

// init firestore
const db = firebase.firestore()

// init authentication
const auth = firebase.auth()

// init storage
const storage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { db, auth, storage, timestamp }
