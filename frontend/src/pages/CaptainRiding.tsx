import { useState, useRef, useEffect } from "react"
import { FaSortDown } from "react-icons/fa"
import { FaRoad } from "react-icons/fa6"
import { RideCompleted } from "../components/RideCompleted"
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
    return <div className="h-screen flex flex-col max-w-md mx-auto  bg-gray-50">
        <div className="h-4/5 relative">
            <img
                className="h-full w-full object-cover"
                src="https://onefivenine.com/images/GoogleMapImages/22_7175_87.jpg"
                alt="Route Map"
            />
        </div>
        <div onClick={()=>setCompleteRide(true)} className="h-1/5  bg-yellow-400 ">
            <FaSortDown className="mx-auto text-center text-xl"></FaSortDown>
            <div className="flex flex-row justify-between flex-wrap p-5 gap-2">
                <div className="flex flex-row  items-center gap-2">
                    <FaRoad className="text-xl text-gray-900"></FaRoad>
                    <p className="font-semibold text-lg text-gray-900 capitalize">5 kM Away</p>
                </div>
                <button className=" bg-green-600 py-2 px-5 text-white  rounded-xl font-semibold">
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