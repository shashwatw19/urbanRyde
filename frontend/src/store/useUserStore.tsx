import { create } from "zustand";
import { persist , createJSONStorage } from "zustand/middleware";
import { UserStore } from "../types/userTypes";
import { UserSignInSchema } from "../schema/UserSchema";
import { SignUpUser } from "../types/userTypes";
import { toast } from "sonner";
import axios from "axios";
import { USER } from "../apis";
axios.defaults.withCredentials = true;
const useUserStore = create<UserStore>()(
    persist((set ,get)=>({
        loading : false,
        user : null,
        signin : async(input : UserSignInSchema)=>{
            const toastId = toast.loading('loading...');
            try{
                set({loading : true})
                const response = await axios.post(USER.signin , input , {headers : {'Content-Type' : 'application/json'}})
                console.log("response from signin function" , response);
                return true
            }catch(e){
                console.log("error occured in signin" , e)
                return false
            }finally{
                set({loading : false})
                toast.dismiss(toastId)
            }
        },
        signup : async(input : SignUpUser)=>{
            const toastId = toast.loading('loading...');
            try{
                set({loading : true})
                const response = await axios.post(USER.signup , input , {headers : {'Content-Type' : 'application/json'}})
                console.log("response from signup function" , response);
                return true
            }catch(e){
                console.log("error occured in singup" , e)
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
                const response = await axios.get(USER.signin)
                console.log("response from logout function" , response);
                return true
            }catch(e){
                console.log("error occured in logout" , e)
                return false
            }finally{
                set({loading : false})
                toast.dismiss(toastId)
            }
        }
    }),{
        name : 'user-storage',
        storage : createJSONStorage(()=>localStorage)
    })
)

export {useUserStore}