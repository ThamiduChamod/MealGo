import { useLoader } from "@/hooks/useLoader"
import { createContext, ReactNode, useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/services/firebase"

interface AuthContextProps {
    user: User | null
    loading: boolean
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: false
})

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const {showLoader, hideLoader, isLoading} = useLoader()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        showLoader()
        const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
            setUser(authenticatedUser)
            hideLoader()
        })

        return unsubscribe
    },[])

    return(
        <AuthContext.Provider value={{user, loading: isLoading}}>
            {children}
        </AuthContext.Provider>
    )
    
}