import { ReactNode, useContext, useEffect } from "react"
import { AuthDataContext } from "../context/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
type CaptainProtectedWrapperType = {
    children : ReactNode
}
const CaptainProtectedWrapper = ({children} : CaptainProtectedWrapperType) => {
  const {loading , isAuthenticated , checkAuth , userRole} = useContext(AuthDataContext)
  const [localLoadingState , setLocalLoadingState] = useState<boolean>(false)
  console.log("authState from captain" , isAuthenticated , "userRole from captain" , userRole)
  const navigate = useNavigate()
  console.log("loading in captainProtected" , loading)
  console.log("localLoading" , localLoadingState)  

  useEffect(()=>{
    const verifyAuth = async()=>{
        if(loading)
            return;
        if(isAuthenticated && userRole === 'captain'){
            return;
        }
        if(isAuthenticated && userRole === 'user'){
            navigate('/user/home')
            return;
        }

        setLocalLoadingState(true)
        const response = await checkAuth('captain')
        if(!response){
            navigate('/captain-signin')
            return
        }
        setLocalLoadingState(false)
    }
    verifyAuth()
  } , [isAuthenticated, userRole, loading, navigate , checkAuth])

  if (loading || localLoadingState) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || userRole !== 'captain') {
        return null;
    }

    return <>{children}</>;
 }

export default CaptainProtectedWrapper
