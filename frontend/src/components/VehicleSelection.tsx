import VehicleCard from './VehicleCard'
import { FaSortDown } from 'react-icons/fa'
import { VehicleTypes } from './VehicleCard'
import { fareType } from '../pages/HomeUser'
type VehicleSelectionType = {
  setVehiclePanel : (value : boolean)=>void
  setConfirmRidePanel : (value : boolean)=>void
  setVehicle : (value : VehicleTypes)=>void
  fare : fareType
}
const VehicleSelection = ({setVehiclePanel , setConfirmRidePanel , setVehicle , fare}:VehicleSelectionType) => {
  return (
   <div className='w-full max-w-md mx-auto px-6 pt-2 relative'>
       <div className="text-2xl top-0 absolute right-0" onClick={()=>setVehiclePanel(false)}><FaSortDown/></div>
      <p className='text-2xl font-semibold text-black mb-5 capitalize'>Choose a vehicle</p>  
 
     <VehicleCard fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} setVehicle={setVehicle}/>
   </div>
  )
}

export default VehicleSelection