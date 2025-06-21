import { createContext, ReactNode, useState } from "react"
import { User } from "../types/userTypes";
import { Captain, SignUpCaptain } from "../types/captainTypes";
import { UserSignUpType } from "../types/userTypes";
type UserContextProps = {
  children: ReactNode;
};
type UserContextTpye = {
    user : User | Captain,
    setUser : (value : User | Captain)=>void,
    userSignupData : UserSignUpType | SignUpCaptain
    setUserSignupData : (value : UserSignUpType | SignUpCaptain)=>void
    loading : boolean
    setLoading : (value : boolean)=>void
}
export const UserDataContext = createContext<UserContextTpye>({} as UserContextTpye)

const UserContext = ({ children }: UserContextProps) => {
   const [user , setUser] = useState<User | Captain>({
        _id : "",
        email : "",
        fullname : {
            firstname : "",
            lastname : ""
        },
        vehicle : {
          color : "",
          capacity : undefined ,
          NumberPlate : "",
          vehicleType : null
        }
   }) 
   const [userSignupData , setUserSignupData] = useState<UserSignUpType | SignUpCaptain>({
        email : "",
        password : "",
        fullname : {
            firstname : "",
            lastname : ""
        },
        otp : "",
        vehicle : {
          color : "",
          capacity : undefined ,
          NumberPlate : "",
          vehicleType : null
        }

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