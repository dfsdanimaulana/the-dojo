import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [ isCancelled, setIsCancelled ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ isPending, setIsPending ] = useState(false)
    const { dispatch } = useAuthContext()
    
    const logout = async () => {
        setError(null)
        setIsPending(true)
        try {
            // logout user
            await auth.signOut()
            
            // dispatch logout function
            dispatch({type: 'LOGOUT'} )
            
            // will not update state if isCancelled true
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        } catch (err) {
            if(!isCancelled){
                console.log(err)
                setError(error.message)
                setIsPending(false)
            }
        }
    }
    // clean up function
    useEffect(()=> {
        return () => setIsCancelled(true)
    }, [])
    
    return {logout, error, isPending}
}