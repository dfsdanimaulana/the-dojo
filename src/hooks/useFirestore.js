import { useReducer, useEffect, useState } from 'react'
import { serverTimestamp, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

let initialValue = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        document: null,
        isPending: true,
        success: false,
        error: null,
      }

    case 'ADDED_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      }

    case 'DELETED_DOCUMENT':
      return {
        document: null,
        isPending: false,
        success: true,
        error: null,
      }

    case 'ERROR':
      return {
        document: null,
        isPending: false,
        success: false,
        error: action.payload,
      }
    case 'UPDATED_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      }
    default:
      return state
  }
}

export const useFirestore = (_collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialValue)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection reference
  const colRef = collection(db, _collection)

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add document
  const addDocument = async (_doc) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      const createdAt = serverTimestamp().fromDate(new Date()) // create timestamp for the documents
      const addedDocument = await addDoc(colRef, { ..._doc, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  // delete document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      const docRef = doc(db, _collection, id)
      await deleteDoc(docRef)
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  // update document
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const docRef = doc(db, _collection, id)
      const updatedDocument = await updateDoc(docRef, {...updates})
      dispatchIfNotCancelled({
        type: 'UPDATED_DOCUMENT',
        payload: updatedDocument,
      })
      return updatedDocument
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
      return null
    }
  }

  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { response, addDocument, deleteDocument, updateDocument }
}
