import { FaSortDown, FaPhone, FaStar, FaCar } from 'react-icons/fa'
import { VehicleTypes } from './VehicleCard'
import { FaLocationDot } from "react-icons/fa6"
import { FaLocationPinLock } from 'react-icons/fa6'
import { FaMoneyCheck } from 'react-icons/fa6'
import { FaMessage } from 'react-icons/fa6'
import { useState, useEffect } from 'react'
import car from "../assets/car.webp"
import bike from "../assets/bike.webp"
import auto from "../assets/auto.webp"

type WaitingForDriverType = {
    vehicle : VehicleTypes,
    setVehicle : (value : VehicleTypes)=>void
    setWaitingForDriver : (value : boolean)=>void
    setLookingForDriver? : (value : boolean)=>void
}

const WaitingForDriver = ({vehicle , setVehicle , setWaitingForDriver, setLookingForDriver} : WaitingForDriverType) => {
    const [arrivalTime, setArrivalTime] = useState(5) // minutes
    const [driverInfo] = useState({
        name: "Rajesh Kumar",
        rating: 4.8,
        carNumber: "MP 09 AB 1234",
        phone: "+91 98765 43210"
    })

    const getVehicleImage = () => {
        switch(vehicle.type) {
            case 'car': return car;
            case 'auto': return auto;
            case 'bike': return bike;
            default: return car;
        }
    }

    // Countdown timer for arrival
    useEffect(() => {
        const timer = setInterval(() => {
            setArrivalTime(prev => prev > 0 ? prev - 0.1 : 0)
        }, 6000) // Decrease by 0.1 every 6 seconds for demo
        
        return () => clearInterval(timer)
    }, [])

    const handleCall = () => {
        window.location.href = `tel:${driverInfo.phone}`
    }

    const handleMessage = () => {
        // Implement messaging functionality
        console.log("Opening message to driver")
    }

    const handleCancel = () => {
        setWaitingForDriver(false)
        setLookingForDriver?.(true)
    }

    return (
        <div className='max-w-md mx-auto'>
            {/* Header */}
            <div className='flex flex-row justify-between items-start '>
                <div>
                    <h2 className='text-xl font-semibold text-black capitalize'>Driver Assigned</h2>
                    <p className='text-sm text-gray-600 mt-1'>Your driver is on the way</p>
                </div>
                <button 
                    className='text-2xl text-black cursor-pointer hover:text-gray-600 transition-colors'
                    onClick={() => setWaitingForDriver(false)}
                >
                    <FaSortDown/>
                </button>
            </div>

            {/* Vehicle Image with Arrival Time */}
            <div className='flex justify-center mb-4'>
                <div className='relative'>
                    {/* Blue gradient background */}
                    <div className='absolute -inset-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full opacity-20 blur-xl'></div>
                    <div className='absolute -inset-2 bg-gradient-to-r from-green-300 via-green-400 to-green-500 rounded-full opacity-30 blur-md'></div>
                    <div className='absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 rounded-full shadow-lg'></div>
                    
                    {/* Vehicle image */}
                    <img 
                        src={getVehicleImage()} 
                        alt={vehicle.name}
                        className="w-32 h-32 object-contain relative z-10 p-6"
                    />
                    
                    {/* Arrival time badge */}
                    <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                        {Math.ceil(arrivalTime)} min
                    </div>
                </div>
            </div>

            {/* Driver Info Card */}
            <div className='bg-white border border-gray-200 rounded-lg p-2 mb-2 shadow-sm'>
                <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-3'>
                        <div className='w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center'>
                            <span className='text-lg font-bold text-gray-700'>
                                {driverInfo.name.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <p className='font-semibold text-black'>{driverInfo.name}</p>
                            <div className='flex items-center gap-1'>
                                <FaStar className='text-yellow-500 text-sm'/>
                                <span className='text-sm text-gray-600'>{driverInfo.rating}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className='flex gap-2'>
                        <button 
                            onClick={handleCall}
                            className='bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors'
                        >
                            <FaPhone className='text-sm'/>
                        </button>
                        <button 
                            onClick={handleMessage}
                            className='bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors'
                        >
                            <FaMessage className='text-sm'/>
                        </button>
                    </div>
                </div>
                
                {/* Car details */}
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                    <FaCar/>
                    <span>{vehicle.name} • {driverInfo.carNumber}</span>
                </div>
            </div>

            {/* Vehicle Details */}
            <div className='text-center mb-4'>
                <p className='text-lg font-semibold text-black capitalize'>{vehicle.name}</p>
                <div className='text-gray-700 text-xs mb-2'>
                    <span className='capitalize'>{vehicle.tags[0]}</span>
                    <span className='ml-1 capitalize'>• {vehicle.tags[1]}</span>
                    <span className='ml-1 capitalize'>• {vehicle.tags[2]}</span>
                </div>
            </div>

            {/* Trip Details */}
            <div className='flex flex-col gap-3 mb-4'>
                <div className='flex flex-row items-center gap-4 p-3 bg-gray-50 rounded-lg'>
                    <FaLocationDot className='text-green-600 text-lg flex-shrink-0'/>
                    <div className='flex-1'>
                        <p className='text-base font-semibold text-black'>8/31 Vijay Nagar</p>
                        <p className='text-sm text-gray-700'>Vijay Nagar Indore</p>
                    </div>
                </div>
                
                <div className='flex flex-row items-center gap-4 p-3 bg-gray-50 rounded-lg'>
                    <FaLocationPinLock className='text-red-600 text-lg flex-shrink-0'/>
                    <div className='flex-1'>
                        <p className='text-base font-semibold text-black'>75-C Vandana Nagar</p>
                        <p className='text-sm text-gray-700'>Near Bengali Square</p>
                    </div>
                </div>
                
                <div className='flex flex-row items-center gap-4 p-3 bg-gray-50 rounded-lg'>
                    <FaMoneyCheck className='text-blue-600 text-lg flex-shrink-0'/>
                    <div className='flex-1'>
                        <p className='text-lg font-bold text-green-600'>₹{vehicle.price}</p>
                        <p className='text-sm text-gray-700'>Cash | UPI | Wallet</p>
                    </div>
                </div>
            </div>

            {/* Status Info */}
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4'>
                <div className='text-center'>
                    <p className='text-sm text-blue-800 font-medium'>Driver Status</p>
                    <p className='text-lg font-bold text-blue-900'>
                        {arrivalTime > 3 ? 'On the way' : 
                         arrivalTime > 1 ? 'Almost there' : 
                         'Arrived'}
                    </p>
                    <p className='text-sm text-blue-700 mt-1'>
                        ETA: {Math.ceil(arrivalTime)} minutes
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='space-y-3'>
                <button 
                    onClick={handleCall}
                    className='w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2'
                >
                    <FaPhone/>
                    <span>Call Driver</span>
                </button>
                
                <button 
                    onClick={handleCancel}
                    className='w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200'
                >
                    Cancel Ride
                </button>
            </div>

            {/* Additional Info */}
            <div className='mt-4 text-center'>
                <p className='text-xs text-gray-500'>
                    You can track your driver in real-time
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                    Driver will call you when arrived
                </p>
            </div>
        </div>
    )
}

export default WaitingForDriver