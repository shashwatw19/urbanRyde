import { apiConnector } from "../../apiConnector";
import { PAYMENT } from "../../apis";

export const sendRideEndedMail = async (emailId : string , username : string , captain : string, vehicleType : string, duration: number , distance: number , fare: number , pickup : string, destination: string ) => {
    try {
        const response = await apiConnector("POST", PAYMENT.SEND_RIDE_ENDED_MAIL, { emailId , username , captain , vehicleType , duration , distance , fare , pickup , destination});
        return response;
    } catch (error) {
        console.error(
            "error occured while sending rideEndedMail" , error
        )
        throw error;
    }
};

