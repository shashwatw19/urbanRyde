import { FaClock } from "react-icons/fa6";
import { SiSpeedtest } from "react-icons/si";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useContext } from "react";
import { AuthDataContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserContext";
const CaptainDetails = () => {
  const {userData , } = useContext(AuthDataContext)
  const {getFormattedSessionTime , trip , distanceTravelled , amount} = useContext(UserDataContext)
  return (
    <div className='bg-white p-5 flex flex-col h-full gap-10 justify-start'>
        <div className="p-3 ">
            <div className="flex justify-between items-start ">
              {/* Driver & Vehicle Info - Simplified */}
              <div className="bg-white rounded-lg w-full ">
                <div className="flex items-center gap-3">
                  {/* Driver Avatar */}
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-gray-700 capitalize">S</span>
                  </div>

                  {/* Driver Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 capitalize">{userData?.fullname.firstname} {userData?.fullname.lastname}</p>
                    
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500 text-xs" />
                      <span className="text-sm text-gray-600">4.6</span>
                    </div>
                  </div>

                  {/* Earning INfo */}
                  <div className="text-start p-3">
                    <p className="text-xl font-semibold">₹{amount}</p>
                    <p className="text-sm font-medium text-gray-600 text-center">Earned</p>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className="flex justify-between gap-4 p-4 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 rounded-lg shadow-sm h-[40%] items-center">
              <div className="flex flex-col items-center flex-1">
                <FaClock className="text-xl text-black  mb-1" />
                <span className="text-base font-semibold text-gray-900">{getFormattedSessionTime()}</span>
                <span className="text-xs text-gray-800">Online</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <SiSpeedtest className="text-xl text-black  mb-1" />
                <span className="text-base font-semibold text-gray-900">{parseFloat((distanceTravelled).toFixed(2))}Km</span>
                <span className="text-xs text-gray-800">Distance</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <FaRegNoteSticky className="text-xl text-black mb-1" />
                <span className="text-base font-semibold text-gray-900">{trip}</span>
                <span className="text-xs text-gray-800">Trips</span>
              </div>
        </div>
  </div>
  )
}

export default CaptainDetails