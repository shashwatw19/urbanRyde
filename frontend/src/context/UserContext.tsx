import { createContext, ReactNode, useState } from "react"
import { User } from "../types/userTypes";
import { UserSignUpType } from "../types/userTypes";
type UserContextProps = {
  children: ReactNode;
};
type UserContextTpye = {
    user : User,
    setUser : (value : User)=>void,
    userSignupData : UserSignUpType
    setUserSignupData : (value : UserSignUpType)=>void
    loading : boolean
    setLoading : (value : boolean)=>void
}
export const UserDataContext = createContext<UserContextTpye>({} as UserContextTpye)

const UserContext = ({ children }: UserContextProps) => {
   const [user , setUser] = useState<User>({
        _id : "",
        email : "",
        fullname : {
            firstname : "",
            lastname : ""
        }
   }) 
   const [userSignupData , setUserSignupData] = useState<UserSignUpType>({
        email : "",
        password : "",
        fullname : {
            firstname : "",
            lastname : ""
        },
        otp : ""

   })
   const [loading , setLoading] = useState<boolean>(false)
  return (
    <div>
        <UserDataContext.Provider value={{user , setUser , userSignupData , setUserSignupData , loading , setLoading}}>
            {children}
        </UserDataContext.Provider>
    </div>
  );
};

export default UserContext