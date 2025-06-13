import { FaRoad, FaMoneyCheck, FaStar, FaClock } from "react-icons/fa"
import { FaLocationDot, FaLocationPinLock } from "react-icons/fa6"

type ConfirmRidePopUpTypes = {
    setConfirmRidePopup : (value :boolean)=>void
    setRidePopup : (value : boolean)=>void
}

const ConfirmRidePopUp = ({setConfirmRidePopup , setRidePopup}:ConfirmRidePopUpTypes) => {
    const handlePopUps = ()=>{
        setRidePopup(false)
        setConfirmRidePopup(false)
    }
    
    return (
        <div className="p-5 max-w-md h-screen flex flex-col bg-white">
            {/* Header with notification indicator */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Confirm
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">Accept within 30 seconds</p>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 space-y-5">
                {/* Driver Info Card */}
                <div className=" border border-green-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-4">
                        {/* Driver Avatar */}
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-xl font-bold text-white">S</span>
                        </div>

                        {/* Driver Details */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                             <p className="text-lg font-bold text-gray-900">Shashwat Wawge</p>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-green-700">
                                        <FaRoad className="text-sm"/>
                                        <span className="text-sm font-semibold">4.6 km Away</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-4">
                    {/* Pickup Location */}
                    <div className="flex items-start gap-4 p-4  border border-blue-100 rounded-xl">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <FaLocationDot className="text-blue-600 text-lg"/>
                        </div>
                        <div className="flex-1">
                            <p className="text-lg font-semibold text-gray-900 mb-1">8/31 Vijay Nagar</p>
                            <p className="text-sm text-blue-700 font-medium">Pickup Location</p>
                            <p className="text-sm text-gray-600">Vijay Nagar Indore</p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-start gap-4 p-2 border border-red-100 rounded-xl">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <FaLocationPinLock className="text-red-600 text-lg"/>
                        </div>
                        <div className="flex-1">
                            <p className="text-lg font-semibold text-gray-900 mb-1">75-C Vandana Nagar</p>
                            <p className="text-sm text-red-700 font-medium">Destination</p>
                            <p className="text-sm text-gray-600">Near Bengali Square</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-100 rounded-xl">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaMoneyCheck className="text-green-600 text-lg"/>
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                            <div>
                                <p className="text-2xl font-bold text-green-700">₹100</p>
                                <p className="text-sm text-green-600 font-medium">Trip Fare</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-700">Payment Methods</p>
                                <p className="text-xs text-gray-600">Cash • UPI • Wallet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 ">
                <button 
                    className="w-full bg-green-600  text-white py-2 rounded-xl font-semibold"
                >
                    Accept Ride
                </button>
                
                <button 
                    onClick={handlePopUps} 
                    className="w-full bg-red-600  text-white py-2 rounded-xl font-semibold"
                >
                    Decline
                </button>
            </div>

          
            
        </div>
    )
}

export default ConfirmRidePopUp