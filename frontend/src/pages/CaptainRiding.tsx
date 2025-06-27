import { useState, useRef, useEffect } from "react"
import { FaSortDown } from "react-icons/fa"
import { FaRoad } from "react-icons/fa6"
import { RideCompleted } from "../components/RideCompleted"
import LiveTracking from "../components/LiveTracking"
import gsap from "gsap"
import { useContext } from "react"
import { RideContext } from "../context/RideContext"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const CaptainRiding = () => {
    const [completeRide, setCompleteRide] = useState<boolean>(false)
    const completeRideRef = useRef(null)
    const { rideId } = useParams<{ rideId?: string }>();
    const [rideStartTime] = useState(new Date());
    const [elapsedTime, setElapsedTime] = useState(0);
    const { ride, isValidRide, loading, error, clearError } = useContext(RideContext);
    const navigate = useNavigate()
    const handleVerifyRide = async () => {
        if (rideId) await isValidRide(rideId, 'captain');
    };
    console.log("rideID", rideId);
    const hasValidRideId = rideId && rideId.trim().length > 0;
    useEffect(() => {
        if (hasValidRideId) {
            handleVerifyRide();
        }
    }, [rideId]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearError();
        }
    }, [error, clearError]);
    const handleCompleteRide = () => {
        if (completeRide) {
            gsap.to(completeRideRef.current, {
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            })
        } else {
            gsap.to(completeRideRef.current, {
                y: "100%",
                duration: 0.5,
                ease: "power2.out"
            })
        }
    }
    useEffect(() => {
        const updateElapsedTime = () => {
            const now = new Date();
            const elapsed = Math.floor((now.getTime() - rideStartTime.getTime()) / 60000);
            setElapsedTime(elapsed);
        };

        updateElapsedTime();
        const interval = setInterval(updateElapsedTime, 60000);
        return () => clearInterval(interval);
    }, [rideStartTime]);

    useEffect(() => {
        handleCompleteRide()
    }, [completeRide])

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
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No Active Ride</h2>
                    <p className="text-gray-600 mb-4">You don't have any ongoing rides</p>
                    <button
                        onClick={() => navigate('/captain/home')}
                        className="bg-black text-white px-6 py-2 rounded-lg font-medium"
                    >
                        Find A Ride
                    </button>
                </div>
            </div>
        );
    }
    return <div className="h-screen flex flex-col max-w-md mx-auto">
        <div className="h-4/5 relative">
            <LiveTracking />
        </div>
        
        <div
            onClick={() => setCompleteRide(true)}
            className="bg-yellow-400 flex flex-col h-1/5 relative justify-around"
            style={{
          
            background: "linear-gradient(180deg, #fde047 0%, #facc15 100%)"
            }}
        >
            <div className="">
                <FaSortDown className="absolute top-0 left-[50%] text-xl" />
            <div className="flex flex-row justify-between items-center p-2 gap-1">
            <div className="flex flex-row items-center gap-1">
                <FaRoad className="text-lg text-gray-900" />
                <p className="font-semibold text-base text-gray-900 capitalize">5 kM Away</p>
            </div>
            <button
                onClick={() => setCompleteRide(true)}
                className="bg-green-600 p-2 text-white rounded-lg w-[40%] font-semibold text-base"
            >
                Complete Ride
            </button>
            </div>
            </div>
           <div>
            
            <div className="px-2 pb-2 space-y-2">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-red-700">Destination</p>
                <p className="text-base font-semibold text-gray-900 truncate">
                    {ride?.destination || "Loading destination..."}
                </p>
                </div>
            </div>
            
          
            </div>
           </div>
        </div>
        <div className={`bg-green-50 border border-gray-200  p-2 mb-3`}>
            <div className="text-center">
                <p className={`text-base font-semibold text-green-500 capitalize`}>
                    Ride in Progress
                </p>
                {ride?.status === 'ongoing' && (
                    <p className="text-xs text-gray-600 mt-1">
                        Started {elapsedTime} minutes ago
                    </p>
                )}
            </div>
        </div>
        <div ref={completeRideRef} className="fixed w-full bottom-0 translate-y-full  z-10  bg-white">
            <RideCompleted setCompleteRide={setCompleteRide} />
        </div>

    </div>
}

export { CaptainRiding }