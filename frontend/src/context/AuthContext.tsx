import { ReactNode } from "react"
import { createContext } from "react"
import { useState } from "react"

type AuthContextProps = {
    children : ReactNode
}

type AuthContextType = {
    isAuthenticated : boolean,
    setIsAuthenticated : (value : boolean)=>void
}

export const AuthDataContext = createContext<AuthContextType>({} as AuthContextType)


const AuthContext = ({children} : AuthContextProps)=>{
    const [isAuthenticated , setIsAuthenticated] = useState<boolean>(false);
    return (
        <AuthDataContext.Provider value={{isAuthenticated , setIsAuthenticated}}>
            {children}
        </AuthDataContext.Provider>
    )
}

export default AuthContext