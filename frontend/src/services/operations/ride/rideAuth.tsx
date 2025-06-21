
import { apiConnector } from "../../apiConnector";
import { RIDE } from "../../apis";

const verifyRide = async(rideId  : string , user : 'user' | 'captain'):Promise<any>=>{
    if(!rideId || rideId.length == 0){
        throw new Error('invaldi ride id')
    }
    if(!user || user.length ==0){
        throw new Error('invalid user ')
    }
    const url = (user == 'user') ? RIDE.VERIFY_RIDE_USER : RIDE.VERIFY_RIDE_CAPTAIN
    console.log("veriy ride req url " , url)
    try{
        const response = await apiConnector('POST' , url , {rideId} , {
            'Content-Type' : 'application/json'
        })
        
        return response.data
    }catch(e){
        console.log("error occured while validation of ride , isValidRide" , e)
        
    }
} 

export {verifyRide}