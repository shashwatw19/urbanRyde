import { FaSortDown, FaPhone, FaStar, FaCar } from 'react-icons/fa'
import { VehicleTypes } from './VehicleCard'
import { FaLocationDot } from "react-icons/fa6"
import { FaLocationPinLock } from 'react-icons/fa6'
import { FaMoneyCheck } from 'react-icons/fa6'
import { FaMessage } from 'react-icons/fa6'
import { useState } from 'react'
import { RideContext } from '../context/RideContext'
import { useContext } from 'react'

type WaitingForDriverType = {
    vehicle : VehicleTypes, 
    setVehicle : (value : VehicleTypes)=>void
    setWaitingForDriver : (value : boolean)=>void
    setLookingForDriver? : (value : boolean)=>void
    
}

const WaitingForDriver = ({vehicle , setVehicle , setWaitingForDriver, setLookingForDriver } : WaitingForDriverType) => {
    const [arrivalTime, setArrivalTime] = useState(5) // minutes
    const {ride} = useContext(RideContext)
    const handleCancel = () => {
        setWaitingForDriver(false)
        setLookingForDriver?.(true)
    }

    return (
        <div className='max-w-md h-screen mx-auto flex flex-col justify-between gap-2  overflow-y-auto p-2'>
            {/* Header */}
            <div className='flex flex-row justify-between items-start mb-2'>
                <div>
                    <h2 className='text-lg font-semibold text-black capitalize'>Driver Assigned</h2>
                    <p className='text-xs text-gray-600'>Your driver is on the way</p>
                </div>
                <button 
                    className='text-xl text-black cursor-pointer hover:text-gray-600 transition-colors'
                    onClick={() => setWaitingForDriver(false)}
                >
                    <FaSortDown/>
                </button>
            </div>


            {/* Driver Info Card */}
            <div className='bg-white border border-gray-200 rounded-lg p-2 mb-2 shadow-sm'>
                <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-2'>
                        <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center'>
                            <span className='text-sm font-bold text-gray-700 capitalize' >
                                {ride?.captain?.fullname.firstname[0]}
                            </span>
                        </div>
                        <div>
                            <p className='font-semibold text-sm text-black capitalize flex items-center gap-2'><span>{ride?.captain?.fullname.firstname}</span><span>{ride?.captain?.fullname.lastname}</span></p>
                            <div className='flex items-center gap-1'>
                                <FaStar className='text-yellow-500 text-xs'/>
                                <span className='text-xs text-gray-600'>{4.3}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                            <FaMessage className="text-gray-500 text-xs" />
                            <span className="text-xs font-medium text-gray-700">OTP</span>
                        </div>
                        <span className="text-base font-bold text-gray-600 ">
                            {ride?.otp}
                        </span>
                    </div>
                </div>
                
                {/* Car details */}
                <div className='flex items-center gap-2 text-xs capitalize  text-gray-600'>
                   
                   {vehicle.name}  • {ride?.captain?.vehicle.NumberPlate}
                </div>
            </div>



            {/* Trip Details */}
            <div className='flex flex-col gap-2 mb-3'>
                <div className='flex flex-row items-center gap-3 p-2 bg-gray-50 rounded-lg'>
                    <FaLocationDot className='text-green-600 text-sm flex-shrink-0'/>
                    <div className='flex-1'>
                        <p className='text-sm font-semibold text-black'>{ride?.pickup}</p>
                    </div>
                </div>
                
                <div className='flex flex-row items-center gap-3 p-2 bg-gray-50 rounded-lg'>
                    <FaLocationPinLock className='text-red-600 text-sm flex-shrink-0'/>
                    <div className='flex-1'>
                        <p className='text-sm font-semibold text-black'>{ride?.destination}</p>
                    </div>
                </div>
                
                <div className='flex flex-row items-center gap-3 p-2 bg-gray-50 rounded-lg'>
                    <FaMoneyCheck className='text-blue-600 text-sm flex-shrink-0'/>
                    <div className='flex-1'>
                        <p className='text-base font-bold text-green-600'>₹{ride?.fare}</p>
                        <p className='text-xs text-gray-700'>Cash • UPI • Wallet</p>
                    </div>
                </div>
            </div>

            {/* Status Info */}
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3'>
                <div className='text-center'>
                    <p className='text-xs text-blue-800 font-medium'>Driver Status</p>
                    <p className='text-sm font-bold text-blue-900'>
                        {arrivalTime > 3 ? 'On the way' : 
                         arrivalTime > 1 ? 'Almost there' : 
                         'Arrived'}
                    </p>
                    <p className='text-xs text-blue-700'>
                        ETA: {Math.ceil(arrivalTime)} minutes
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='space-y-2 mb-2'>
                <button 
                    
                    className='w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 text-sm'
                >
                    <FaMessage/>
                    <span>Message Driver</span>
                </button>
                
                <button 
                    onClick={handleCancel}
                    className='w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors duration-200 text-sm'
                >
                    Cancel Ride
                </button>
            </div>

            {/* Additional Info */}
            <div className='text-center'>
                <p className='text-xs text-gray-500'>
                    You can track your driver in real-time
                </p>
            </div>
        </div>
    )
}

export default WaitingForDriver