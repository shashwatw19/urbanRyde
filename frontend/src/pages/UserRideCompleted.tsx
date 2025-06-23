import { VehicleTypes } from "../components/VehicleCard";
import car from "../assets/car.webp";
import auto from "../assets/auto.webp";
import bike from "../assets/bike.webp";
import { FaCar, FaMoneyCheck, FaStar } from "react-icons/fa";
import { FaLocationPinLock } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { RideContext } from "../context/RideContext";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import LiveTracking from "../components/LiveTracking";
const vehicle: VehicleTypes = {
  name: "UberGo",
  type: "car",
  img: car,
  tags: ["affordable", "City Rides", "Economy"],
};


const UserRideCompleted = () => {
  const {ride , isValidRide ,loading, error, clearError} = useContext(RideContext)
  const { rideId } = useParams<{ rideId?: string }>();
  const hasValidRideId = rideId && rideId.trim().length > 0;
  const navigate = useNavigate()
  const getVehicleImage = (vehicle: VehicleTypes) => {
    switch (vehicle.type) {
      case "car":
        return car;
      case "auto":
        return auto;
      case "moto":
        return bike;
      default:
        return car;
    }
  };
  const handleVerifyRide = async () => {
    if (rideId) await isValidRide(rideId, 'user');
  };
  useEffect(()=>{
   handleVerifyRide()
  },[rideId])
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);
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


  if (!hasValidRideId) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Active Payments Requests</h2>
          <p className="text-gray-600 mb-4">You don't have any ongoing rides</p>
          <button
            onClick={() => navigate('/user/home')}
            className="bg-black text-white px-6 py-2 rounded-lg font-medium"
          >
            Book a Ride
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col max-w-md mx-auto overflow-hidden bg-gray-50">
      {/* Map Section */}

        <LiveTracking/>

      {/* Content Section */}
      <div className="bg-white px-2 flex flex-col justify-start" style={{height: "calc(100vh - 400px)"}}>

       
          <div className="flex justify-between items-start p-3">
            {/* Driver & Vehicle Info - Simplified */}
            <div className="bg-white rounded-lg w-full  ">
              <div className="flex items-center gap-3">
                {/* Driver Avatar */}
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-gray-700">{ride?.captain?.fullname.firstname[0]}</span>
                </div>

                {/* Driver Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 capitalize">{ride?.captain?.fullname.firstname} {ride?.captain?.fullname?.lastname}</p>
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
              <p className="font-semibold text-base text-gray-800 ">{ride?.destination}</p>
              
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

        {/* Payment Button */}
        <div className="p-3">
          <button className="w-full bg-green-600 text-white py-2  rounded-xl font-semibold text-base ">
          Complete Payment
        </button>

        <div className="flex justify-center mt-1 p-1">
          <p className="text-xs text-gray-500">
            Secure payment • Trip will end after payment
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserRideCompleted;
