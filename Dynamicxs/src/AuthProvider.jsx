import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null)

    const updateAuthState = (newState) => {
        setAuthState(newState)
    }

    return (
        <AuthContext.Provider value={{ authState, updateAuthState }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
