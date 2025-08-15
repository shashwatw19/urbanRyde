import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";
import { useState } from "react";
type UserProtectedWrapperType = {
    children : ReactNode
}
const UserProtectedWrapper = ({ children }: UserProtectedWrapperType) => {
    const { isAuthenticated , userRole , checkAuth , loading} = useContext(AuthDataContext);
    const [localLoading , setLocalLoading] = useState<boolean>(false)
    const navigate = useNavigate();
    console.log("autStatus from user " , isAuthenticated , "userRole from user" , userRole)
    useEffect(() => {
      const verifyUserAuth = async()=>{
        if(loading ) return ;
        if(isAuthenticated && userRole === 'user'){
            return;
        }
        if(isAuthenticated && userRole === 'captain'){
            navigate('/captain/home')
            return;
        }

        setLocalLoading(true)
        const isUserAuth = await checkAuth('user')  
        console.log("checked for userAuth" , isUserAuth)                                        
        if(!isUserAuth){
        
           const isCaptainAuth =  await checkAuth('captain')
           console.log("checked for captainAuth ...." , isCaptainAuth)
            isCaptainAuth ? navigate('/captain/home') :  navigate('/signin')
          
        }
        setLocalLoading(false)
      }
      verifyUserAuth()
    }, [isAuthenticated, userRole, loading]);

    if (loading || localLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || userRole !== 'user') {
        return null;
    }

    return <>{children}</>;
};
export {UserProtectedWrapper}