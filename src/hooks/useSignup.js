import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'

// custom hooks
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
      // signup user
      const res = await auth.createUserWithEmailAndPassword(email, password)
      console.log(res.user)

      // bad/invalid response
      if (!res) {
        throw new Error('Could not complete sign up')
      }

      // update user data
      await res.user.updateProfile({ displayName })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })
      if (!isCancelled) {
        setIsPending(false)
        setError(false)
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error)
        setError(error.message)
        setIsPending(false)
      }
    }
  }

  // clean up function
  useEffect(() => {
    return setIsCancelled(true)
  }, [])

  return { error, isPending, signup }
}
