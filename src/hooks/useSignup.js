import { useState, useEffect } from 'react'
import { auth, storage, db } from '../firebase/config'

// custom hooks
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumb) => {
    setError(null)
    setIsPending(true)

    try {
      // signup user
      const res = await auth.createUserWithEmailAndPassword(email, password)

      // bad/invalid response
      if (!res) {
        throw new Error('Could not complete sign up')
      }

      // upload user thumbnail

      // create thumb image folder path
      const uploadPath = `thumbnails/${res.user.uid}/${thumb.name}`
      // upload image
      const img = await storage.ref(uploadPath).put(thumb)
      // get image url
      const photoURL = await img.ref.getDownloadURL()

      // update user displayName in firebase
      await res.user.updateProfile({ displayName, photoURL })

      // create user document
      await db.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL,
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
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
    return () => setIsCancelled(true)
  }, [])

  return { error, isPending, signup }
}
