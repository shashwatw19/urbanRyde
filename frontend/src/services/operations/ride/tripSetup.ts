import { apiConnector } from "../../apiConnector";
import { RIDE } from "../../apis"
import { RideType } from "../../../types/rideTypes";
export type ConfirmRideType = {
    rideId: string,
    otp: string,
    setLoading : (value : boolean)=>void,
   userSocketId : string
   setRide : (value : RideType)=>void
}


const getFareForTrip = async (pickup: string, destination: string) => {
    if (pickup.length <= 2 || destination.length <= 2) {
        throw new Error('invalid location length')
    }
    try {
        const params = `pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`;
        const urlWithParams = `${RIDE.GET_FARE}?${params}`;
        const response = await apiConnector("GET", urlWithParams, undefined, {
            'Content-Type': 'application/json'
        });
        console.log("response from getFare", response)
        return response.data.data
    } catch (e) {
        console.error("error in getFareForTrip fn in frontend", e)
        return
    }
}
const createRide = async ({ pickup, destination, vehicleType }: Partial<RideType>) => {
    if (!pickup || pickup.length <= 2) {
        throw new Error("Invalid pickup location");
    }
    if (!destination || destination.length <= 2) {
        throw new Error("Invalid destination location");
    }
    if (!vehicleType) {
        throw new Error("Vehicle type is required");
    }
    try {
        const data = { pickup, destination, vehicleType };
        const response = await apiConnector('POST', RIDE.CREATE_RIDE, data, {
            'Content-Type': 'application/json'
        });
        console.log("response from createRIde", response);
        return response.data;
    } catch (e) {
        console.log("error from createRide component", e);
        throw e;

    }
}
const confirmRide = async({rideId , setLoading}:{rideId : string , setLoading : (value : boolean)=>void})=>{
    if(!rideId && rideId.length == 0){
        throw new Error('invalid rideId')
    }
   try{ 
        setLoading(true)
        const response = await apiConnector("POST" , RIDE.CONFIRM_RIDE , {rideId} , {
            'Content-Type' : 'application/json'
        }) 
        console.log("response from confirmRide fn " , response)
    }catch(e){
        console.log("error in confirmRide fn" , e)
    }finally{
        setLoading(false)
    }
}
const startRide = async ({ rideId, otp , userSocketId ,setLoading , setRide}: ConfirmRideType) => {
    if (!rideId || rideId.length == 0) {
        throw new Error('invald rideId length')
    }
  
    if (!otp || otp.length == 0) {
        throw new Error('invald otp length')
    }

    try{
        setLoading(true)
        const response = await apiConnector('POST' , RIDE.START_RIDE , {rideId , otp , userSocketId } , {
            'Content-Type' : 'application/json'
        })
        console.log("response from start ride" , response.data)
        setRide(response.data.data)
        return response.data.success
    }catch(e){
        console.log("error from confirmRide component" , e)
    }finally{
        setLoading(false)
    }

}
export { getFareForTrip, createRide , startRide , confirmRide}