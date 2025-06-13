import {  FaMoneyCheck } from "react-icons/fa";
import { FaLocationDot, FaLocationPinLock } from "react-icons/fa6";
import { FaRoad } from "react-icons/fa6";
type RidePopUPType = {
    setRidePopup : (value : boolean)=>void
    setConfirmRidePopup : (value : boolean)=>void
}
const RidePopUP = ({setRidePopup , setConfirmRidePopup}:RidePopUPType) => {
  return (
    <div className="p-2 max-w-md">
      <div className="flex flex-row justify-between items-start mb-4">
        <p className="text-xl font-semibold text-black capitalize">
            new ride available
        </p>
       
      </div>
      <div className="flex flex-col items-start gap-3 ">
        <div className="flex flex-row items-center gap-4 w-full bg-gray-50 py-2 px-1 rounded-md">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-white">S</span>
          </div>

          {/* Driver Details */}
          <div className="flex-1 w-full flex flex-row justify-between ">
            <p className="font-semibold text-gray-900">Shashwat Wawge</p>

            <div className="flex items-center font-semibold gap-1">
              <FaRoad className="text-gray-500 text-base" />
              <span className="text-base text-gray-500">4.6 kms away</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 px-3">
          <FaLocationDot />
          <div>
            <p className="text-lg font-semibold ">8/31</p>
            <p className="text-sm text-gray-700">Vijay Nagar Indore</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 px-3">
          <FaLocationPinLock />
          <div>
            <p className="text-lg font-semibold">75-C Vandana Nagar</p>
            <p className="text-sm text-gray-700">Near bengali Square</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 px-3">
          <FaMoneyCheck />
          <div>
            <p className="text-lg font-bold text-green-600 ">₹100</p>
            <p className="text-sm text-gray-700">Cash | UPI | Wallet</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center gap-2 mt-5">
         <button onClick={()=>setRidePopup(false)} className="w-full bg-gray-500 text-white py-2 rounded-lg  font-semibold">
            Ignore
        </button>
        <button onClick={()=>setConfirmRidePopup(true)} className="w-full bg-green-600 text-white py-2 rounded-lg  font-semibold">
            Accept 
      </button>
     
      </div>
    </div>
  );
};

export default RidePopUP;
