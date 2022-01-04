import { useState, useEffect } from 'react'
import { auth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)
    try {
      // login user
      const res = await auth.signInWithEmailAndPassword(email, password)

      // update online status to true
      const { uid } = res.user
      await db.collection('users').doc(uid).update({ online: true })

      // dispatch login function
      dispatch({ type: 'LOGIN', payload: res.user })

      // will not update state if isCancelled true
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err)
        setError(err.message)
        setIsPending(false)
      }
    }
  }
  // clean up function
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, error, isPending }
}
