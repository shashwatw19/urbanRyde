import { ReactNode, useEffect } from "react"
import { createContext } from "react"
import { useState } from "react"
import { checkUserAuth } from "../services/operations/user/auth"
import { checkCaptainAuth } from "../services/operations/captain/captainAuth"
type AuthContextProps = {
    children : ReactNode
}
type UserRole = 'user' | 'captain' | null;
type AuthContextType = {
    isAuthenticated : boolean,
    setIsAuthenticated : (value : boolean)=>void
    userRole : UserRole,
    userData : any;
    loading : boolean,
    setUserRole : (value : any)=>void
    setAuth : (authenticated : boolean , role : UserRole , data?:any)=>void
    clearAuth : ()=>void,
    checkAuth : (role : UserRole)=>Promise<boolean>
}

export const AuthDataContext = createContext<AuthContextType>({} as AuthContextType)


const AuthProvider = ({children} : AuthContextProps)=>{
    const [isAuthenticated , setIsAuthenticated] = useState<boolean>(false);
    const [userRole , setUserRole] = useState<UserRole>(null)
    const [userData , setUserData] = useState(null)
    const [loading , setLoading] = useState(true)

    const setAuth = (authenticated : boolean , role : UserRole , data?:any)=>{
        setIsAuthenticated(authenticated)
        setUserRole(role)
        setUserData(data)
    }
    const clearAuth = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setUserData(null);
       
    }; 

    const checkAuth = async(role : UserRole) : Promise<boolean>=>{
        try{
            setLoading(true)
            let response ;
            if(role === 'user'){
                response = await checkUserAuth()
            }
            else if(role === 'captain'){
                response = await checkCaptainAuth()
            }
            else {
                return false
            }
            if(response && response.success){
                console.log(`${role} autheticated successfully`)
                setAuth(true , role , response.data)
                return true
            }else{
                console.log(` ${role} authentication failed`)
                clearAuth()
                return false
            }
        }catch(e){
            console.log(`${role} auth check failed..` , e)
            clearAuth()
            return false
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        const initAuth = async () => {
            // Try user auth first
            const userAuth = await checkAuth('user');
            if (userAuth) return;

            // If user auth fails, try captain auth
            await checkAuth('captain');
            setLoading(false)
        };

        initAuth();
    }, []);
    return (
        <AuthDataContext.Provider value={{isAuthenticated , checkAuth , setIsAuthenticated , userRole , userData , setUserRole , loading , setAuth , clearAuth ,}}>
            {children}
        </AuthDataContext.Provider>
    )
}

export default AuthProvider