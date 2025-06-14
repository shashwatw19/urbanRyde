import { FaRoad, FaMoneyCheck } from "react-icons/fa"
import { FaLocationDot, FaLocationPinLock } from "react-icons/fa6"
import { Link } from "react-router-dom"

type RideCompleted = {
    setCompleteRide : (input : boolean)=>void
}
const RideCompleted = ({setCompleteRide} : RideCompleted)=>{
    return         <div className="p-5 max-w-md h-screen flex flex-col bg-white">
            {/* Header with notification indicator */}
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                        End this ride
                </h2>
 
            </div>

            {/* Main content */}
            <div className="flex-1 space-y-2">
                {/* Driver Info Card */}
                <div className=" border border-green-200  rounded-xl ">
                    <div className="flex items-center gap-2 p-3">
                        {/* Driver Avatar */}
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center ">
                            <span className="text-xl font-bold text-white">S</span>
                        </div>

                        {/* Driver Details */}
                        <div className="flex-1 ">
                            <div className="flex justify-between  items-center mb-2">
                                <p className="text-lg font-bold text-gray-900">Shashwat Wawge</p>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-green-700">
                                        <FaRoad className="text-sm" />
                                        <span className="text-sm font-semibold">Reached</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-4">
                    {/* Pickup Location */}
                    <div className="flex items-start gap-2 p-2  border border-blue-100 rounded-xl">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <FaLocationDot className="text-blue-600 text-sm" />
                        </div>
                        <div className="flex-1">
                            <p className="text-lg font-semibold text-gray-900 ">8/31 Vijay Nagar</p>
                            
                            <p className="text-sm text-gray-600">Vijay Nagar Indore</p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-start gap-2 p-2 border border-red-100 rounded-xl">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <FaLocationPinLock className="text-red-600 text-sm" />
                        </div>
                        <div className="flex-1">
                            <p className="text-lg font-semibold text-gray-900 ">75-C Vandana Nagar</p>
                            <p className="text-sm text-gray-600">Near Bengali Square</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-100 rounded-xl">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaMoneyCheck className="text-green-600 text-lg" />
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                            <div>
                                <p className="text-xl font-bold text-green-700">₹100</p>
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
            <form className="flex flex-col justify-between gap-2 p-2  mb-10 " >

                   
                    <div className="flex items-center justify-between gap-2 w-full">
                        
                        <Link className="w-full" to={"/captain/home"}>
                        <button className="w-full  bg-green-600  text-white py-2 rounded-xl font-semibold">
                            Finish Ride
                        </button>
                        </Link>

                        
                    </div>
                    <p className="text-xs text-center text-red-600">Click on finsih ride button if you have completed the payment</p>
            </form>
        </div>
}
export {RideCompleted}