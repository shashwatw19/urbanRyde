import { OTP, USER } from "../../apis";
import { apiConnector } from "../../apiConnector";
import { UserSignUpType } from "../../../types/userTypes";
import { toast } from "sonner";
import axios from "axios";


export const createOtp = async(email : string , setLoading : (value : boolean)=>void)=>{
    const toastId = toast.loading('generating otp...')
    try{
        setLoading(true)
        const response = await apiConnector("POST" , OTP.create , {email} , {
            'Content-Type' : 'application/json'
        })
        toast.success('otp has been sent on your email')
        console.log("response from createOtp" , response)
        return true
    }catch(e){
        if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data.message || "something went wrong"
            toast.error(errorMessage)
            console.log("error from createOtp ", e)
            
        }
        return false
    }finally{
        setLoading(false)
        toast.dismiss(toastId)
    }
}
export const signup = async(input : UserSignUpType , setLoading : (value : boolean)=>void)=>{
    const toastId = toast.loading('verifying...')
    try{
        setLoading(true)
        const response = await apiConnector("POST" , USER.signup , input , {
            'Content-Type' : 'application/json'
        } )
        toast.success("account created!")
        console.log("response from signup function.." , response)
        return true;
    }catch(e){
        if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data?.message || "Something went wrong";
            toast.error(errorMessage)
            console.log("error from signup " , e)
        }
        return false
    }finally{
        setLoading(false)
        toast.dismiss(toastId)
    }
}