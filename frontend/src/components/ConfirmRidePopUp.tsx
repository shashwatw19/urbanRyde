import { FaRoad, FaMoneyCheck } from "react-icons/fa"
import { FaLocationDot, FaLocationPinLock } from "react-icons/fa6"
import { RideContext } from "../context/RideContext"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { startRide } from "../services/operations/ride/tripSetup"
import { UserDataContext } from "../context/UserContext"
import { useContext } from "react"

type ConfirmRidePopUpTypes = {
    setConfirmRidePopup: (value: boolean) => void
   
    setCaptainRiding : (value : boolean)=>void
}

const ConfirmRidePopUp = ({setConfirmRidePopup, setCaptainRiding}: ConfirmRidePopUpTypes) => {
    
    const {ride , setRide} = useContext(RideContext)
   
    const { setLoading , loading} = useContext(UserDataContext)
    const handleStartRide = async (e: FormEvent) => {
        e.preventDefault()

        if (otp.length != 6) {
            toast.error('please enter a valid otp')
            return;
        }
        const data = {
            rideId: ride?._id!,
            otp: otp,
            userSocketId: ride?.user?.socketId!,
            setLoading: setLoading,
            setRide : setRide
        }
        console.log("data sent for confirmRide" , data)
        try {
            const response = await startRide(data)
            if (response) {
                setConfirmRidePopup(false)
                setCaptainRiding(true)
                setOtp("")
            } else {
                toast.error('invalid ride or otp')
            }
            return
        } catch (e) {
            console.log("error while starting ride in confirmRidePopUP", e)
        }
    }
    const [otp, setOtp] = useState<string>("")
    return (
        <div className="p-5 max-w-md h-screen flex flex-col bg-white">
            {/* Header with notification indicator */}
            <div className="flex items-center gap-3 mb-6">

                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Confirm
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 capitalize">when you reach at pickup enter otp to start the ride</p>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 space-y-2 ">
                {/* Driver Info Card */}
                <div className=" border border-green-200 rounded-xl ">
                    <div className="flex items-center gap-2 p-3">
                        {/* Driver Avatar */}
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center ">
                            <span className="text-base font-bold text-white">{ride?.user?.fullname.firstname[0]}</span>
                        </div>

                        {/* Driver Details */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-base font-bold text-gray-700 flex items-center gap-2 capitalize"><span>{ride?.user?.fullname.firstname}</span><span>{ride?.user?.fullname.lastname}</span></p>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-green-700">
                                        <FaRoad className="text-sm" />
                                        <span className="text-sm font-semibold">{ride?.distance} Km</span>
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
                            <p className="text-base font-semibold text-gray-700 ">{ride?.pickup}</p>


                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-start gap-2 p-2 border border-red-100 rounded-xl">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <FaLocationPinLock className="text-red-600 text-sm" />
                        </div>
                        <div className="flex-1">
                            <p className="text-base font-semibold text-gray-700 ">{ride?.destination}</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-100 rounded-xl">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaMoneyCheck className="text-green-600 text-lg" />
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                            <div>
                                <p className="text-lg font-bold text-green-700">₹{ride?.fare}</p>
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
            <form className="flex flex-col justify-center  gap-5 p-2 h-[30%] " >

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="otp">
                        Enter OTP
                    </label>
                    <input
                        type="text"
                        id="otp"
                        name="otp"
                        maxLength={6}
                        pattern="\d*"
                        inputMode="numeric"
                        className="w-full px-2 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg text-gray-900 tracking-widest text-center"
                        placeholder="______"
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                    />
                </div>
                <div className="flex items-center justify-between gap-2 w-full">
                    {/* <button onClick={handlePopUps} disabled={loading} className="w-full bg-red-600  text-white py-2 rounded-xl font-semibold">
                        Cancle
                    </button> */}

                    <button type="submit" disabled={loading} onClick={(e)=>handleStartRide(e)} className="w-full  bg-green-600  text-white py-2 rounded-xl font-semibold">
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ConfirmRidePopUp