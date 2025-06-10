import { CAPTAIN } from "../../apis"
import { toast } from "sonner"
import { apiConnector } from "../../apiConnector"
import { UserSignUpType } from "../../../types/userTypes"
import axios from "axios"
import { CaptainSignInSchema } from "../../../schema/CaptainSchema"
export const registerCaptain = async(input : UserSignUpType , setLoading : (value : boolean)=>void)=>{
    const toastId = toast.loading('verifying...')
    try{
        setLoading(true)
        const response = await apiConnector("POST" , CAPTAIN.signup , input , {
            'Content-Type' : 'application/json'
        } )
        toast.success("account created!")
        console.log("response from signup function.." , response)
        return response.data;
    }catch(e){
        if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data?.message || "Something went wrong";
            toast.error(errorMessage)
            console.log("error from signup " , e)
        }
        return {success : false}
    }finally{
        setLoading(false)
        toast.dismiss(toastId)
    }
}
export const captainLogin = async(input :CaptainSignInSchema , setLoading : (value : boolean)=>void )=>{
    const toastId = toast.loading("verifying credentials...")
    try{
        setLoading(true)
        const response = await apiConnector('POST' , CAPTAIN.signin , input , {
            'Content-Type' : 'application/json'
        })
        console.log("response from captainLogin" , response)
        toast.success('logged in successfully')
        return response.data
        
    }catch(e){
        if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data.message || "Something went wrong"
            toast.error(errorMessage)
            
        }
        return {success : false}
    }finally{
        setLoading(false)
        toast.dismiss(toastId)
    }
}


export const checkCaptainAuth = async()=>{
    try{
      const response =  await apiConnector("GET" , CAPTAIN.checkAuth , undefined , {
        'Content-Type' : 'application/json'
      })
      return response.data
    }catch(e){
        console.log("error from checkCaptainAuth" , e)
        return {success : false}
    }   
}