import { apiConnector } from "../../apiConnector";
import {RIDE} from "../../apis"

const getFareForTrip = async(pickup : string , destination : string) =>{
    if(pickup.length <= 2 || destination.length<=2){
        throw new Error('invalid location length')
    }
    try{
        const response = await apiConnector("GET" , RIDE.GET_FARE , undefined , {
            'Content-Type' : 'application/json'
        })
        console.log("response from getFare" , response)
        return response.data.data
    }catch(e){
       console.error("error in getFareForTrip fn in frontend" , e)
       return 
    }
}


export {getFareForTrip}