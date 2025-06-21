export type User = {
    _id? : string,
    fullname : {
        firstname : string,
        lastname : string
    },
    email : string,
    password? : string,
    socketId? : string
}

export interface UserSignUpType extends User{
    otp : string
}
