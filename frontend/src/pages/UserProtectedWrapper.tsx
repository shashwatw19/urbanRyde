import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";
import { useState } from "react";
type UserProtectedWrapperType = {
    children : ReactNode
}
const UserProtectedWrapper = ({ children }: UserProtectedWrapperType) => {
    const { isAuthenticated , userRole , checkAuth , loading} = useContext(AuthDataContext);
    const [authChecked , setAuthChecked] = useState<boolean>(false)
    const navigate = useNavigate();

    useEffect(() => {
      const verifyUserAuth = async()=>{
        if(loading ) return ;
        else if(isAuthenticated && userRole === 'user'){
            setAuthChecked(true)
            return;
        }
        else if(isAuthenticated && userRole=== 'captain'){
            navigate('/captain/home')
            return;
        }

        const isUserAuth = await checkAuth('user')
        if(!isUserAuth){
            navigate('/signin')
        }
        setAuthChecked(true)
      }
      verifyUserAuth()
    }, [isAuthenticated, userRole, loading, navigate, checkAuth]);

    if (loading || !authChecked) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || userRole !== 'user') {
        return null;
    }

    return <>{children}</>;
};
export {UserProtectedWrapper}