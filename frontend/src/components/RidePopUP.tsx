import {  FaMoneyCheck } from "react-icons/fa";
import { FaLocationDot, FaLocationPinLock } from "react-icons/fa6";
import { FaRoad } from "react-icons/fa6";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

import { confirmRide } from "../services/operations/ride/tripSetup";
import { RideContext } from "../context/RideContext";

type RidePopUPType = {
    setRidePopup : (value : boolean)=>void
    setConfirmRidePopup : (value : boolean)=>void,
    
}

const RidePopUP = ({setRidePopup , setConfirmRidePopup }:RidePopUPType) => {
  const {loading , setLoading} = useContext(UserDataContext)
  const {ride , setRide} = useContext(RideContext)
  const handeleAcceptRide = async(e : React.MouseEvent<HTMLButtonElement>)=>{
      try{
        const data = {
          rideId : ride?._id!,
          setLoading : setLoading
        }
        const response = await confirmRide(data)
        setRidePopup(false)
        setConfirmRidePopup(true)
      }catch(e){
        console.log("error in handleAcceptRide" , e)
      }
  }
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
            <span className="text-lg font-bold text-white">{ride?.user?.fullname.firstname[0]}</span>
          </div>

          {/* Driver Details */}
          <div className="flex-1 w-full flex flex-row justify-between ">
            <p className="font-semibold flex flex-row gap-2  text-gray-900"><span>{ride?.user?.fullname.firstname}</span><span>{ride?.user?.fullname.lastname}</span></p>

            <div className="flex items-center font-semibold gap-1">
              <FaRoad className="text-gray-500 text-base" />
              <span className="text-base text-gray-500">4.6 kms away</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 px-3">
          <FaLocationDot />
          <div>
            <p className="text-base font-semibold ">{ride?.pickup}</p>
            
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 px-3">
          <FaLocationPinLock />
          <div>
            <p className="text-base font-semibold">{ride?.destination}</p>
          
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 px-3">
          <FaMoneyCheck />
          <div>
            <p className="text-base font-bold text-green-600 ">{ride?.fare}</p>
            <p className="text-sm text-gray-700">Cash | UPI | Wallet</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center gap-2 mt-5">
         <button disabled={loading} onClick={()=>{setRidePopup(false) ; setRide(null)}} className="w-full bg-gray-500 text-white py-2 rounded-lg  font-semibold">
            Ignore
        </button>
        <button disabled={loading} onClick={(e)=>handeleAcceptRide(e)} className="w-full bg-green-600 text-white py-2 rounded-lg  font-semibold">
            Accept 
      </button>
     
      </div>
    </div>
  );
};

export default RidePopUP;
