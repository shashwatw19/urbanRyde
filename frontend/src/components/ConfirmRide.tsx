import { FaSortDown } from 'react-icons/fa'
import { VehicleTypes } from './VehicleCard'
import { FaLocationDot } from "react-icons/fa6"
import { FaLocationPinLock } from 'react-icons/fa6'
import { FaMoneyCheck } from 'react-icons/fa6'
import { useState } from 'react'
import car from "../assets/car.webp"
import bike from "../assets/bike.webp"
import auto from "../assets/auto.webp"
import { useEffect } from 'react'
type ConfirmRideType = {
    vehicle : VehicleTypes,
    setVehicle : (vehicle : VehicleTypes )=>void
    setConfirmRidePanel : (value : boolean)=>void
    setLookingForDriver : (value : boolean)=>void
}

const ConfirmRide = ({vehicle , setVehicle , setConfirmRidePanel , setLookingForDriver} : ConfirmRideType) => {
  const [ride , setRide] = useState<VehicleTypes>({
    name : vehicle.name,
    img : vehicle.img,
    type : vehicle.type,
    price : vehicle.price,
    tags : vehicle.tags
  })
   const getVehicleImage = () => {
    switch(vehicle.type) {
      case 'car': return car;
      case 'auto': return auto;
      case 'bike': return bike;
      default: return car; // fallback
    }
  }
  

  const handleRidePanel = ()=>{
    setConfirmRidePanel(false)
    setLookingForDriver(true)
  }
  
  return (
    <div className='p-2'>
        <div className='flex flex-row justify-between items-start mb-4'>
            <p className='text-xl font-semibold text-black capitalize'>Confirm your ride</p>
            <div className='text-2xl text-black cursor-pointer' onClick={()=>setConfirmRidePanel(false)}><FaSortDown/></div>
        </div>
        
       <div className='flex justify-center'>
            <img 
                src={getVehicleImage()} 
                alt={vehicle.name}
                className="w-32 h-32 object-contain"
            />
        </div>

        <div className='text-center mb-3'>
            <p className='text-lg font-semibold text-black capitalize'>{vehicle.name}</p>
           <div className='text-gray-700 text-xs mb-2'>
                <span className='capitalize'>{vehicle.tags[0]}</span>
                <span className='ml-1 capitalize'>{vehicle.tags[1]}</span>
                <span className='ml-1 capitalize'>{vehicle.tags[2]}</span>
            </div>
        </div>

        <div className='flex flex-col items-start gap-2'>
            <div className='flex flex-row items-center gap-4'>
                <FaLocationDot/>
               <div>
                    <p className='text-lg font-semibold'>8/31</p>
                    <p className='text-sm text-gray-700'>Vijay Nagar Indore</p>
                </div>
            </div>
            <div className='flex flex-row items-center gap-4'>
                <FaLocationPinLock/>
               <div>
                    <p className='text-lg font-semibold'>75-C Vandana Nagar</p>
                    <p className='text-sm text-gray-700'>Near bengali Square</p>
               </div>
            </div>
            <div className='flex flex-row items-center gap-4'>
                <FaMoneyCheck/>
               <div>
                    <p className='text-lg font-bold text-green-600 '>₹{vehicle.price}</p>
                    <p className='text-sm text-gray-700'>Cash | UPI | Wallet</p>
               </div>
            </div>
        </div>

        
        
        <button onClick={()=>handleRidePanel()} className='w-full bg-green-600 text-white py-2 rounded-lg mt-6 font-semibold'>
            Confirm Ride
        </button>
        <button onClick={()=>setConfirmRidePanel(false)} className='w-full bg-black text-white py-2 rounded-lg mt-2 font-semibold'>
            Cancel 
        </button>
    </div>
  )
}

export default ConfirmRide