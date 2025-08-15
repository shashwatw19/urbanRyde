import { ReactNode, useEffect } from "react"
import { createContext } from "react"
import { useState } from "react"
import { checkUserAuth } from "../services/operations/user/auth"
import { checkCaptainAuth } from "../services/operations/captain/captainAuth"
import { User } from "../types/userTypes"
import { Captain } from "../types/captainTypes"
type AuthContextProps = {
    children : ReactNode
}
type UserRole = 'user' | 'captain' | null;
type AuthContextType = {
    isAuthenticated : boolean,
    setIsAuthenticated : (value : boolean)=>void
    userRole : UserRole,
    userData : User | Captain | null,
    setUserData : (value : User | Captain | null)=>void
    loading : boolean,
    setAuthLoading : (value : boolean)=>void
    setUserRole : (value : any)=>void
    setAuth : (authenticated : boolean , role : UserRole , data : User | Captain)=>void
    clearAuth : ()=>void,
    checkAuth : (role : UserRole)=>Promise<boolean>
}

export const AuthDataContext = createContext<AuthContextType>({} as AuthContextType)


const AuthProvider = ({children} : AuthContextProps)=>{
    const [isAuthenticated , setIsAuthenticated] = useState<boolean>(false);
    const [userRole , setUserRole] = useState<UserRole>(null)
    const [userData , setUserData] = useState<User | Captain | null>({
        _id : "",
        fullname : {
            firstname : "",
            lastname : ""
        },
        email : "",
        vehicle :  {
            color : "",
            NumberPlate : "",
            capacity : undefined,
            vehicleType : null
        }
        
    })
    const [loading , setAuthLoading] = useState(true)

    const setAuth = (authenticated : boolean , role : UserRole , data: User | Captain)=>{
        setIsAuthenticated(authenticated)
        setUserRole(role)
        setUserData(data)
    }
    const clearAuth = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setUserData({
        _id : "",
        fullname : {
            firstname : "",
            lastname : ""
        },
        email : "",
        vehicle :  {
            color : "",
            NumberPlate : "",
            capacity : undefined,
            vehicleType : null
        }
        },
    
    );
       
    }; 

    const checkAuth = async(role : UserRole) : Promise<boolean>=>{
        try{
            
            let response ;
            if(role === 'user'){
                response = await checkUserAuth()
                console.log("response from checkAuthUser AuthContext" , response)
            }
            else if(role === 'captain'){
                response = await checkCaptainAuth()
                console.log("response from checkAuthCaptain AuthContext" , response)
            }
            else {
                return false
            }
            if(response && response.success){
                setAuth(true , role , response.data)
                return true
            }else{
                console.log(` ${role} authentication failed AuthContext`)
                clearAuth()
                return false
            }
        }catch(e){
            console.log(`${role} auth check failed..` , e)
            clearAuth()
            return false
        }finally{
            setAuthLoading(false)
        }
    }

    useEffect(() => {
        const initAuth = async () => {
        setAuthLoading(true);
        const userAuth = await checkAuth('user');
        if (!userAuth) {
            await checkAuth('captain');
        }
        setAuthLoading(false);
        };
        initAuth();
    
    }, []);
    return (
        <AuthDataContext.Provider value={{isAuthenticated , setAuthLoading, checkAuth , setIsAuthenticated , userRole , userData , setUserData, setUserRole , loading , setAuth , clearAuth ,}}>
            {children}
        </AuthDataContext.Provider>
    )
}

export default AuthProvider