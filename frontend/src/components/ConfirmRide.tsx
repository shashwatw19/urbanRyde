import { FaSortDown } from 'react-icons/fa'
import { VehicleTypes } from './VehicleCard'
import { FaLocationDot } from "react-icons/fa6"
import { FaLocationPinLock } from 'react-icons/fa6'
import { FaMoneyCheck } from 'react-icons/fa6'
import car from "../assets/car.webp"
import bike from "../assets/bike.webp"
import auto from "../assets/auto.webp"
import { fareType } from '../pages/HomeUser'
import { TripType } from '../pages/HomeUser'
import { createRide } from '../services/operations/ride/tripSetup'

type ConfirmRideType = {
    vehicle : VehicleTypes,
 
    setConfirmRidePanel : (value : boolean)=>void
    setLookingForDriver : (value : boolean)=>void
    fare : fareType,
    trip : TripType
}

const ConfirmRide = ({vehicle  , setConfirmRidePanel , setLookingForDriver , fare , trip} : ConfirmRideType) => {
  
   const getVehicleImage = () => {
    switch(vehicle.type) {
      case 'car': return car;
      case 'auto': return auto;
      case 'moto': return bike;
      default: return car; // fallback
    }
  }
  

  const handleConfirmRide = async()=>{
    setConfirmRidePanel(false)
    setLookingForDriver(true)
    try{
        const response = await createRide({pickup: trip.pickup , destination: trip.destination , vehicleType: vehicle.type!})
        console.log("response from handleRideConfirm" , response)
    }catch(e){
        console.log("error from frntend in handleConfirmRide" , e )
    }
  }
  
  return (
    <div className='p-5  max-w-md mx-auto'>
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
                    <p className='text-lg font-semibold'>{trip.pickup}</p>
                   
                </div>
            </div>
            <div className='flex flex-row items-center gap-4'>
                <FaLocationPinLock/>
               <div>
                    <p className='text-lg font-semibold'>{trip.destination}</p>
                   
               </div>
            </div>
            <div className='flex flex-row items-center gap-4'>
                <FaMoneyCheck/>
               <div>
                    <p className='text-lg font-bold text-green-600 '>₹{fare[vehicle.type!]}</p>
                    <p className='text-sm text-gray-700'>Cash | UPI | Wallet</p>
               </div>
            </div>
        </div>

        
        
        <button onClick={()=>handleConfirmRide()} className='w-full bg-green-600 text-white py-2 rounded-lg mt-6 font-semibold'>
            Confirm Ride
        </button>
        <button onClick={()=>setConfirmRidePanel(false)} className='w-full bg-black text-white py-2 rounded-lg mt-2 font-semibold'>
            Cancel 
        </button>
    </div>
  )
}

export default ConfirmRide