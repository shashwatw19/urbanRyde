import { CaptainStoreType } from "../types/captainTypes"
import { create  } from "zustand"
import { persist , createJSONStorage } from "zustand/middleware"
import { SignUpCaptain } from "../types/captainTypes"
import { CaptainSignInSchema } from "../schema/CaptainSchema"
import { toast } from "sonner"
import axios from "axios"
import { CAPTAIN } from "../apis"
axios.defaults.withCredentials = true;


const useCaptainStore = create<CaptainStoreType>()(
    persist((set, get)=>({
        loading : false,
        captain : null,
        registerCaptain : async(input : SignUpCaptain)=>{
            const toastId = toast.loading('loading...');
            try{
                set({loading : true})
                const response = await axios.post(CAPTAIN.signup , input , {headers : {'Content-Type' : 'application/json'}})
                console.log("response from signup captain function" , response);
                return true
            }catch(e){
                console.log("error occured in singup captain" , e)
                return false
            }finally{
                set({loading : false})
                toast.dismiss(toastId)
            }
        },
        captainLogin : async(input : CaptainSignInSchema)=>{
            const toastId = toast.loading('loading...');
            try{
                set({loading : true})
                const response = await axios.post(CAPTAIN.signin , input , {headers : {'Content-Type' : 'application/json'}})
                console.log("response from signin captain function" , response);
                return true
            }catch(e){
                console.log("error occured in singin captain" , e)
                return false
            }finally{
                set({loading : false})
                toast.dismiss(toastId)
            }
        },
        logout : async()=>{
            const toastId = toast.loading('loading...');
            try{
                set({loading : true})
                const response = await axios.get(CAPTAIN.logout)
                console.log("response from logout captain function" , response);
                return true
            }catch(e){
                console.log("error occured in logout captain function" , e)
                return false
            }finally{
                set({loading : false})
                toast.dismiss(toastId)
            }
        }
    }),{
        name : 'captain-storage',
        storage : createJSONStorage(()=>localStorage)
    })
)


export {useCaptainStore}