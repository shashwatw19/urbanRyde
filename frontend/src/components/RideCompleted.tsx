import { FaRoad, FaMoneyCheck } from "react-icons/fa"
import { FaLocationDot, FaLocationPinLock } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"
import { FaSortDown } from "react-icons/fa"
import { useContext } from "react"
import { RideContext } from "../context/RideContext"
import { SocketContext } from "../context/socketContext"

import { toast } from "sonner"
import { requestPayment } from "../services/operations/ride/tripSetup"
import { UserDataContext } from "../context/UserContext"
type RideCompleted = {
    setCompleteRide: (input: boolean) => void
    setPaymentRequested : (input : boolean)=>void
    setWaitingForPayment : (input : boolean)=>void
    setRequestingPayment : (input : boolean)=>void
    setPaymentCompleted : (input : boolean)=>void
    setRidePopup :  (input : boolean)=>void
    setConfirmRidePopup :  (input : boolean)=>void
    setCaptainRiding :  (input : boolean)=>void
    waitingForPayment : boolean
    paymentCompleted : boolean
    paymentRequest : boolean
    requestingPayment : boolean
   
}

const RideCompleted = ({ setCompleteRide , setPaymentRequested  , setWaitingForPayment , setRequestingPayment , waitingForPayment , paymentCompleted , paymentRequest , 
    requestingPayment , setPaymentCompleted , setRidePopup , setConfirmRidePopup , setCaptainRiding}: RideCompleted) => {
    const { ride , setRide , clearRide } = useContext(RideContext)
    const { socket } = useContext(SocketContext)
    const { setLoading } = useContext(UserDataContext)
    const navigate = useNavigate()
    
    const clearCaptainModalStates = () => {
        setRidePopup(false);
        setConfirmRidePopup(false);
        setCaptainRiding(false);
        setCompleteRide(false);
        setPaymentRequested(false);
        setPaymentCompleted(false);
        setWaitingForPayment(false);
        setRequestingPayment(false);

  localStorage.removeItem("captain_ridePopup");
  localStorage.removeItem("captain_confirmRidePopup");
  localStorage.removeItem("captain_captainRiding");
  localStorage.removeItem("captain_completeRide");
  localStorage.removeItem("captain_paymentRequest");
  localStorage.removeItem("captain_paymentCompleted");
  localStorage.removeItem("captain_waitingForPayment");
  localStorage.removeItem("captain_requestingPayment");
};
   
    const handleRequestPayment = async () => {
        if (socket && ride?._id && ride.captain?._id && ride.user?._id) {
            setRequestingPayment(true)
            try {
                const response = await requestPayment({ rideId: ride._id, userSocketId: ride.user.socketId, setLoading })
                if (response) {
                    setPaymentRequested(true);
                    setWaitingForPayment(true);
                    setRequestingPayment(false);

                    toast.success('Payment request sent to user');

                    setTimeout(() => {
                        if (waitingForPayment && !paymentCompleted) {
                            setWaitingForPayment(false)
                            toast.warning('Payment request timed out.')
                        }
                    }, 5 * 60 * 1000)
                }
            } catch (e) {
                console.error('Error requesting payment:', e);
                setRequestingPayment(false);
                toast.error('Failed to send payment request');
            }
        } else {
            if (!ride?._id || !socket) {
                toast.error('Unable to request payment')
            }
            else if (!ride.user?._id || !ride.captain?._id) {
                toast.error('Missing user or captain information')
            }
        }
    }
    const getPaymentStatus = () => {
        if (paymentCompleted) {
            return {
                text: 'Payment Received',
                color: 'text-green-600',
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200'
            };
        }
        if (waitingForPayment) {
            return {
                text: 'Waiting for Payment',
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-200'
            };
        }
        if (paymentRequest) {
            return {
                text: 'Payment Request Sent',
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200'
            };
        }
        return {
            text: 'Payment Pending',
            color: 'text-gray-600',
            bgColor: 'bg-gray-50',
            borderColor: 'border-gray-200'
        };
    }
    const handleEndRide = ()=>{
        setCompleteRide(false)
        clearCaptainModalStates()
        navigate('/captain/home')
        clearRide()
    }
    const paymentStatus = getPaymentStatus()
    return (
        <div className="p-5 max-w-md min-h-screen bg-white flex flex-col justify-between">
            <div>
                <div className="flex items-start justify-between gap-2 mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        End this ride
                    </h2>
                    <FaSortDown onClick={() => setCompleteRide(false)} className="text-lg" />
                </div>

                <div className="flex flex-col justify-start gap-6 flex-grow mt-5">
                    <div className="border border-green-100 rounded-lg">
                        <div className="flex items-center gap-2 p-2">
                            <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                                <span className="text-lg font-bold text-white">{ride?.user?.fullname?.firstname[0]}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-base font-bold text-gray-900 capitalize">{ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}</p>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-green-700">
                                            <FaRoad className="text-xs" />
                                            <span className="text-xs font-semibold">Reached</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-5 mt-5">
                        {/* Trip Details */}
                        <div className="space-y-2">
                            {/* Pickup Location */}
                            <div className="flex items-start gap-2 p-2 border border-blue-50 rounded-lg">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <FaLocationDot className="text-blue-600 text-xs" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-semibold text-gray-900">{ride?.pickup}</p>
                                </div>
                            </div>

                            {/* Destination */}
                            <div className="flex items-start gap-2 p-2 border border-red-50 rounded-lg">
                                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <FaLocationPinLock className="text-red-600 text-xs" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-semibold text-gray-900">{ride?.destination}</p>
                                </div>
                            </div>

                            <div className={`flex items-center gap-2 p-2 ${paymentStatus.bgColor} border ${paymentStatus.borderColor} rounded-lg`}>
                                <div className={`w-6 h-6 ${paymentStatus.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                                    <FaMoneyCheck className={`${paymentStatus.color} text-sm`} />
                                </div>
                                <div className="flex-1 flex justify-between items-center">
                                    <div>
                                        <p className={`text-lg font-bold ${paymentStatus.color}`}>₹{ride?.fare}</p>
                                        <p className={`text-xs font-medium ${paymentStatus.color}`}>Trip Fare</p>
                                    </div>
                                    <div className="text-center">
                                        <p className={`text-xs font-medium ${paymentStatus.color}`}>
                                            {paymentStatus.text}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {paymentCompleted ? 'Completed' :
                                                waitingForPayment ? 'Pending...' :
                                                    'Cash • UPI • Wallet'}
                                        </p>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
            <form className="flex flex-col justify-between gap-1.5 p-1.5 mb-5">
                {/* Payment Request Button */}
                 
                    <>
                        {!paymentCompleted && <button
                            type="button"
                            onClick={handleRequestPayment}
                            disabled={requestingPayment || waitingForPayment}
                            className={`w-full p-2 rounded-lg font-semibold text-base bg-blue-700 text-white`}
                        >
                            {requestingPayment ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Sending Request...
                                </span>
                            ) : waitingForPayment ? (
                                'Waiting for User Payment...'
                            ) : paymentRequest ? (
                                'Request Payment Again'
                            ) : (
                                'Request Payment'
                            )}
                        </button>}
                        {/* Finish Ride Button */}
                        <div className="flex items-center justify-between gap-2 w-full">
                            {paymentCompleted ? (
                                <Link className="w-full" to={"/captain/home"}>
                                    <button onClick={()=>{
                                       handleEndRide()
                                    }} className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg font-semibold text-base transition-colors duration-200">
                                        Finish Ride ✅
                                    </button>
                                </Link>
                            ) : (
                                <button
                                    disabled
                                    className="w-full bg-gray-400 text-white p-2 rounded-lg font-semibold text-base cursor-not-allowed opacity-70"
                                >
                                    Finish Ride (Payment Required)
                                </button>
                            )}
                        </div>

                        {/* Status Message */}
                        <p className={`text-xs text-center ${paymentCompleted ? 'text-green-600' :
                                waitingForPayment ? 'text-yellow-600' :
                                    'text-red-600'
                            }`}>
                            {paymentCompleted
                                ? ' Payment received! You can now finish the ride.'
                                : waitingForPayment
                                    ? ' Waiting for user to complete payment...'
                                    : 'Request payment from user before finishing ride'}
                        </p>
                    </>
                
            </form>

        </div>
    )
}

export { RideCompleted }