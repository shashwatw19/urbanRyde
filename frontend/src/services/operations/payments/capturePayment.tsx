import { apiConnector } from "../../apiConnector";
import { PAYMENT } from "../../apis";

const capturePayment = async(rideId : string , fare : number , setLoading : (value : boolean)=>void)=>{
    if(!rideId || rideId.length == 0){
        throw new Error('Invalid Ride Id')
    }
    try{
        setLoading(true)
        const response = await apiConnector("POST" , PAYMENT.CAPTURE_PAYMENT , {rideId , fare} , {
            'Content-Type' : 'application/json'
        })
        console.log("response from capturePayment" , response)
        return response
    }catch(e){
        console.error("error in capture Payment" , e)
        throw e
    }finally{
        setLoading(false)
    }
}

export {capturePayment}