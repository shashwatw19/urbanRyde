import { useState, useRef, useEffect } from "react"
import { FaSortDown } from "react-icons/fa"
import { FaRoad } from "react-icons/fa6"
import { RideCompleted } from "../components/RideCompleted"
import LiveTracking from "../components/LiveTracking"
import gsap from "gsap"

const CaptainRiding = () => {
    const [completeRide, setCompleteRide] = useState<boolean>(false)
    const completeRideRef = useRef(null)
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
        handleCompleteRide()
    }, [completeRide])
    return <div className="h-screen flex flex-col max-w-md mx-auto">
        <div className="h-[400px] relative">
                <LiveTracking/>
        </div>
        <div
            onClick={() => setCompleteRide(true)}
            className="bg-yellow-400"
            style={{ height: "calc(100vh - 400px)" }}
        >
            <FaSortDown className="mx-auto text-center text-xl" />
            <div className="flex flex-row justify-between flex-wrap p-5 gap-2">
            <div className="flex flex-row items-center gap-2">
                <FaRoad className="text-xl text-gray-900" />
                <p className="font-semibold text-lg text-gray-900 capitalize">5 kM Away</p>
            </div>
            <button className="bg-green-600 py-2 px-5 text-white rounded-xl font-semibold">
                Complete Ride
            </button>
            </div>
        </div>

            <div ref={completeRideRef} className="fixed w-full bottom-0 translate-y-full  z-10  bg-white">
                <RideCompleted setCompleteRide={setCompleteRide} />
            </div>

    </div>
}

export { CaptainRiding }