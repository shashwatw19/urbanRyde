import { VehicleTypes } from "../components/VehicleCard";
import car from "../assets/car.webp";
import { FaMoneyCheck, FaStar } from "react-icons/fa";
import { FaLocationPinLock } from "react-icons/fa6";
import { useNavigate, } from "react-router-dom";
import { RideContext } from "../context/RideContext";
import { FormEvent, useContext, } from "react";
import { toast } from "sonner";
import LiveTracking from "../components/LiveTracking";
import { loadScript } from "../services/operations/payments/loadScript";
import { capturePayment } from "../services/operations/payments/capturePayment";
import { UserDataContext } from "../context/UserContext";
import { verifyPayment } from "../services/operations/payments/verifyPayment";
import { sendRideEndedMail } from "../services/operations/payments/sendRideEndedMail";
import { AuthDataContext } from "../context/AuthContext";
import { TripType } from "./HomeUser";
import { clearRideId } from "../utils/ridePersistence";
declare const window: any;
const vehicle: VehicleTypes = {
  name: "UberGo",
  type: "car",
  img: car,
  tags: ["affordable", "City Rides", "Economy"],
};

interface UserRideCompletedProps {
  setPaymentRequest: (value: boolean) => void;
  setRideStarted : (valie : boolean)=>void
  setWaitingForDriver : (valie : boolean)=>void
  setLookingForDriver : (valie : boolean)=>void
  setTrip : ({pickup , destination} : TripType)=>void
}

const UserRideCompleted = ({ setPaymentRequest  , setRideStarted , setWaitingForDriver , setLookingForDriver , setTrip}: UserRideCompletedProps) => {
  
  const { ride, loading , clearRide} = useContext(RideContext);
  const { setLoading } = useContext(UserDataContext);
  const { userData } = useContext(AuthDataContext);
  const navigate = useNavigate();

  
  // payment integration starts from here......
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const rzpScript = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
			if (!rzpScript) {
				toast.error("Razorpay SDK failed to load. Check your Internet Connection.")
				return;
			}
      if (ride) {
        const paymentResponse = await capturePayment(ride?._id!, ride.fare! , setLoading);
        console.log("paymentResponse from rzp", paymentResponse);
        const options = {
          key: import.meta.env.VITE_RAZORPAY_ID,
          currency: paymentResponse?.data?.data?.currency,
          amount: `${paymentResponse?.data?.data?.amount}`,
          order_id: paymentResponse?.data?.data?.id,
          name: "UrbanRyde",
          description: "Thank you for Purchasing the Course.",

          prefill: {
            name: userData?.fullname.firstname,
            email: userData?.email,
          },
          handler: async function (response: any) {
            console.log("response credentials from frontend " ,response.razorpay_order_id, 
              response.razorpay_payment_id,
              response.razorpay_signature,)
            await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              ride?._id!,
              ride.captain?._id!,
              navigate,
            );
            clearModalStates()
            setTrip({
              pickup : "",
              destination : ""
            })
            clearRideId()
            await sendRideEndedMail(ride?.user?.email! , ride.user?.fullname.firstname! , ride.captain?.fullname.firstname! , ride.captain?.vehicle.vehicleType! , ride.duration! , ride.distance! , ride.fare! , ride.pickup! , ride.destination!);
            clearRide()
          },
          theme: {
            color: "#1a1a1a",
          },
        };
        console.log("options created for window object", options);
        const paymentObject = new window.Razorpay(options);

        paymentObject.open();

        paymentObject.on("payment.failed", function (response: any) {
          toast.error("Payment Failed.");
          console.log(response.error);
        });
      }
    } catch (e) {
      console.log("error occured while payments in userRideCompleted", e);
    }
  };
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="loader border-4 border-gray-300 border-t-blue-600 rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ride details...</p>
        </div>
      </div>
    );
  }
  const clearModalStates = () => {
  setLookingForDriver(false);
  setWaitingForDriver(false);
  setRideStarted(false);
  setPaymentRequest(false);
  localStorage.removeItem("lookingForDriver");
  localStorage.removeItem("waitingForDriver");
  localStorage.removeItem("rideStarted");
  localStorage.removeItem("paymentRequest");
};


  return (
    <div className="h-screen flex flex-col max-w-md mx-auto overflow-hidden bg-gray-50">
      

      <div className="h-2/5">
         <LiveTracking />
      </div>

      {/* Content Section */}
      <div
        className="bg-white  flex flex-col justify-between h-3/5"
       
      >
       <div className="flex flex-col gap-4">
         <div className="flex justify-between items-start p-3">
          {/* Driver & Vehicle Info - Simplified */}
          <div className="bg-white rounded-lg w-full  ">
            <div className="flex items-center gap-3">
              {/* Driver Avatar */}
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-gray-700">
                  {ride?.captain?.fullname.firstname[0]}
                </span>
              </div>

              {/* Driver Details */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 capitalize">
                  {ride?.captain?.fullname.firstname}{" "}
                  {ride?.captain?.fullname?.lastname}
                </p>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-500 text-xs" />
                  <span className="text-sm text-gray-600">4.6</span>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="text-start p-3">
                <div className="text-right space-y-1">
                  <div className="flex items-center justify-end gap-1">
                    <p className="text-sm font-medium text-gray-900">
                      {vehicle.name}
                    </p>
                  </div>

                  <div className="inline-block bg-gradient-to-r from-gray-700 to-gray-900 text-white px-2 py-1 rounded-md">
                    <p className="text-xs font-bold uppercase tracking-wider">
                      {ride?.captain?.vehicle.NumberPlate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="flex flex-col justify-between gap-5 p-2">
          {/* Destination */}
          <div className="flex items-center gap-3 p-3 border border-red-100 bg-red-50 rounded-lg">
            <div className="p-3 bg-red-100 rounded-full">
              <FaLocationPinLock className="text-gray-900 text-base" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-base text-gray-800 ">
                {ride?.destination}
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-lg">
            <div className="flex items-center gap-3">
              <div className=" bg-green-100 rounded-full">
                <FaMoneyCheck className="text-green-600 text-base" />
              </div>
              <div>
                <p className="text-xl font-bold text-green-600">
                  ₹{ride?.fare}
                </p>
                <p className="text-xs text-gray-600">Trip Fare</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">Payment</p>
              <p className="text-xs text-gray-500">Cash • UPI • Wallet</p>
            </div>
          </div>
        </div>
       </div>

        {/* Payment Button */}
        <form onSubmit={handleSubmit} className="p-3 mt-5">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2  rounded-xl font-semibold text-base "
          >
            Complete Payment
          </button>

          <div className="flex justify-center mt-1 p-1">
            <p className="text-xs text-gray-500">
              Secure payment • Trip will end after payment
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRideCompleted;
