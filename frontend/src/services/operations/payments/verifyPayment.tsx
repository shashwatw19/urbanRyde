import { apiConnector } from "../../apiConnector";
import { PAYMENT } from "../../apis";
import { NavigateFunction } from "react-router";
const verifyPayment = async(razorpay_order_id : string, razorpay_payment_id : string , razorpay_signature : string , rideId : string , captainId : string ,  navigate : NavigateFunction)=>{
    if(!razorpay_order_id || razorpay_order_id.length == 0){
        throw new Error('invalid razorpay_order_id')
    }
    if(!razorpay_payment_id || razorpay_payment_id.length == 0){
        throw new Error('invalid razorpay_payment_id' )
    }
    if(!razorpay_signature || razorpay_signature.length == 0){
        throw new Error('invalid razorpay_signature')
    }

    try{
       const response = await apiConnector("POST" , PAYMENT.VERIFY_PAYMENT , {razorpay_order_id , razorpay_payment_id , razorpay_signature , rideId , captainId} , {
        'Content-Type' : 'application/json'
       })

       console.log("response from verifyPayment" , response)
       navigate("/user/home")
       return response.data.data
    }catch(e){
        console.log("some error occured in verifyPayment" , e)
        throw e
    }
}

export {verifyPayment}