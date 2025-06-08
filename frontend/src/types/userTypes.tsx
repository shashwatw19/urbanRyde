import { UserSignInSchema } from "../schema/UserSchema"

export type User = {
    _id : string,
    email : string,
    fullname : {
        firstname : string,
        lastname :string
    },
    socketId? : string | null
}

export interface SignUpUser extends User{
    otp : string
}

export type UserStore = {
    user : User | null,
    loading : boolean,
    signup : (input : SignUpUser)=>Promise<boolean>
    signin : (input : UserSignInSchema)=>Promise<boolean>
    logout : ()=>Promise<boolean>
}
