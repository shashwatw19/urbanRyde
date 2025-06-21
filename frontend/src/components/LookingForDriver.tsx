import { FaSortDown, FaMapMarkerAlt } from 'react-icons/fa'
import { VehicleTypes } from './VehicleCard'
import { FaLocationDot } from "react-icons/fa6"
import { FaLocationPinLock } from 'react-icons/fa6'
import { FaMoneyCheck } from 'react-icons/fa6'
import { useState } from 'react'
import car from "../assets/car.webp"
import bike from "../assets/bike.webp"
import auto from "../assets/auto.webp"
import { fareType } from '../pages/HomeUser'
import { TripType } from '../pages/HomeUser'

type LookingForDriverType = {
    vehicle : VehicleTypes,
    setVehicle : (value : VehicleTypes)=>void
    setWaitingForDriver : (value : boolean)=>void
    setLookingForDriver : (value : boolean)=>void,
    setConfirmRidePanel : (value : boolean)=>void
    fare : fareType,
    trip : TripType

}

const LookingForDriver = ({vehicle , setVehicle , setWaitingForDriver, setLookingForDriver ,setConfirmRidePanel, trip , fare } : LookingForDriverType) => {
   
    const [dots, setDots] = useState('')
   
    const getVehicleImage = () => {
        switch(vehicle.type) {
            case 'car': return car;
            case 'auto': return auto;
            case 'moto': return bike;
            default: return car;
        }
    }
   
    return (
        <div className='px-6 pt-2 max-w-md mx-auto h-screen flex flex-col gap-2 overflow-y-auto'>
            {/* Header */}
            <div className='flex flex-row justify-between items-start'>
                <div>
                    <h2 className='text-xl font-semibold text-black capitalize'>Looking for Driver</h2>
                    <p className='text-sm text-gray-600 mt-1'>We're finding the best driver for you{dots}</p>
                </div>
                
                <p className='text-2xl ' onClick={()=>setLookingForDriver(false)} ><FaSortDown/></p>
            </div>

        <div className='flex flex-col  justify-start'>
              
                <div className='flex justify-center '>
                    <img 
                        src={getVehicleImage()} 
                        alt={vehicle.name}
                        className="w-24 h-24 object-contain relative "
                    />
                </div>
     

            {/* Search Status */}
            <div className='text-center '>
                
                <p className='text-lg font-semibold text-black capitalize'>{vehicle.name}</p>
                <div className='text-gray-700 text-xs mb-2'>
                    <span className='capitalize'>{vehicle.tags[0]}</span>
                    <span className='ml-1 capitalize'>• {vehicle.tags[1]}</span>
                    <span className='ml-1 capitalize'>• {vehicle.tags[2]}</span>
                </div>
            </div>
            </div>

           
           

            {/* Trip Details */}
            <div className='flex flex-col gap-3 mb-6'>
                <div className='flex flex-row items-center gap-4 p-1 bg-gray-50 rounded-lg'>
                    <FaLocationDot className='text-black text-lg flex-shrink-0'/>
                    <div className='flex-1'>
                        <p className='text-base font-semibold text-black'>{trip.pickup}</p>
                        
                    </div>
                </div>
                
                <div className='flex flex-row items-center gap-4 p-1 bg-gray-50 rounded-lg'>
                    <FaLocationPinLock className='text-black text-lg flex-shrink-0'/>
                    <div className='flex-1'>
                        <p className='text-base font-semibold text-black'>{trip.destination}</p>
                    </div>
                </div>
                
                <div className='flex flex-row items-center gap-4 p-1 bg-gray-50 rounded-lg'>
                    <FaMoneyCheck className='text-black text-lg flex-shrink-0'/>
                    <div className='flex-1'>
                        <p className='text-lg font-bold text-green-600'>₹{fare[vehicle.type!]}</p>
                        <p className='text-sm text-gray-700'>Cash | UPI | Wallet</p>
                    </div>
                </div>
            </div>

      
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3'>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-sm text-blue-800 font-medium'>Estimated Arrival</p>
                        <p className='text-lg font-bold text-blue-900'>3-5 minutes</p>
                    </div>
                    <FaMapMarkerAlt className='text-blue-600 text-2xl'/>
                </div>
            </div>

       
            <div className='space-y-3'>
                <button 
                    onClick={() => {
                        setWaitingForDriver(true)
                        setLookingForDriver?.(false)
                    }}
                    className='w-full   bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2'
                >
                    <span className='capitalize animate-pulse'>Looking for driver</span>
                </button>
                <button 
                    onClick={() => {
                        setLookingForDriver(false)
                        setConfirmRidePanel(true)
                    }}
                    className='w-full  bg-red-600 text-white py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2'
                >
                    <span className='capitalize'>Cancle Ride</span>
                </button>
                
              
            </div>

    
            <div className='text-center'>
                <p className='text-sm text-gray-500'>
                    Average wait time: 2-4 minutes
                </p>
                <p className='text-sm text-gray-500 mt-1'>
                    You can cancel anytime before driver arrives
                </p>
            </div>
        </div>

    )
}

export default LookingForDriver