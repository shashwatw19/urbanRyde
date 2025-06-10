import { ReactNode, useContext, useEffect } from "react"
import { AuthDataContext } from "../context/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
type CaptainProtectedWrapperType = {
    children : ReactNode
}
const CaptainProtectedWrapper = ({children} : CaptainProtectedWrapperType) => {
  const {loading , isAuthenticated , checkAuth , userRole} = useContext(AuthDataContext)
  const [authChecked , setAuthChecked] = useState<boolean>(false)
  const navigate = useNavigate()


  useEffect(()=>{
    const verifyAuth = async()=>{
        if(loading)
            return;
        else if(isAuthenticated && userRole === 'captain'){
            setAuthChecked(true)
            return;
        }
        else if(isAuthenticated && userRole === 'user'){
            navigate('/user/home')
            return;
        }

        const response = await checkAuth('captain')
        if(!response){
            navigate('/captain-signin')
            return
        }
        setAuthChecked(true)
    }
    verifyAuth()
  } , [isAuthenticated, userRole, loading, navigate])

  if (loading || !authChecked) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || userRole !== 'captain') {
        return null;
    }

    return <>{children}</>;
 }

export default CaptainProtectedWrapper