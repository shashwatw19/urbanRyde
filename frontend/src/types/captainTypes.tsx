import { User } from "./userTypes";

type CaptainStatus = "active" | "inactive";

export interface Captain extends User{
    status: CaptainStatus;
    vehicle : {
        color : {
            type : string
        },
        NumberPlate : {
            type : string
        },
        capacity : {
            type : number
        },
        vehicleType : 'car' | 'motorcycle' | 'auto'
    },
    location? : {
        ltd : {
            type : number
        },
        lng : {
            type : number
        },

    },
    
}
export interface SignUpCaptain extends Captain{
    otp : string
}


