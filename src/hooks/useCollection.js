import { useState, useEffect, useRef } from 'react'
import { db } from '../firebase/config'
import { collection, where, query, orderBy, onSnapshot } from 'firebase/firestore'

export const useCollection = (_collection, queryInput, orderByInput) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and different on every function call

  // prevent from infinite loop because _query is an array
  const _query = useRef(queryInput).current
  const _orderBy = useRef(orderByInput).current

  useEffect(() => {
    // collection reference
    let colRef = collection(db, _collection)
    
    // queries
    let q = query(colRef)

    // filter collection by query if there is any
    if (_query) {
      q = query(colRef, where(..._query))
    }
    if (orderBy) {
      q = query(colRef, orderBy(..._orderBy))
    }
    const unsub = onSnapshot( q,
      (snapshot) => {
        let results = []
        // get array of docs
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id })
        })

        // update state
        setDocuments(results)
        setError(null)
      },
      (err) => {
        console.log(err)
        setError(err.message)
      }
    )

    // cleanup unsub on unmount
    return () => unsub()
  }, [_collection, _query, _orderBy])

  return { documents, error }
}
