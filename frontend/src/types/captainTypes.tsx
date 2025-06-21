import { User } from "./userTypes";

type CaptainStatus = "active" | "inactive";

export interface Captain extends User{
    
    vehicle : {
        color : string ,
        NumberPlate : string,
        capacity  : number | undefined,
        vehicleType : 'car' | 'moto' | 'auto' | null,
        
    },
    status? : CaptainStatus
    
}
export interface SignUpCaptain extends Captain{
    otp : string
}


