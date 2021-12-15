import { useState, useEffect, useRef } from 'react'
import { db } from '../firebase/config'

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and different on every function call

  // prevent from infinite loop because _query is an array
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    let ref = db.collection(collection)

    // filter collection by query if there is any
    if (query) {
      ref = ref.where(...query)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }
    const unsub = ref.onSnapshot(
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
  }, [collection, query, orderBy])

  return { documents, error }
}
