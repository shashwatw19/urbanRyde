import { User } from "./userTypes"
import { VehicleType } from "../pages/HomeUser"
import { Captain } from "./captainTypes"
export interface RideType {
    _id : string
    pickup : string,
    destination : string,
    vehicleType : VehicleType,
    fare : number | undefined,
    user : User | null,
    captain : Captain | null
    duration: number ,
    status: 'pending' | 'accepted' | 'ongoing' | 'completed' | 'cancelled'
    otp : number | undefined,
    distance : number 
}

