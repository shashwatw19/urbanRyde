import VehicleCard from './VehicleCard'
import { FaSortDown } from 'react-icons/fa'
import { VehicleTypes } from './VehicleCard'
type VehicleSelectionType = {
  setVehiclePanel : (value : boolean)=>void
  setConfirmRidePanel : (value : boolean)=>void
  setVehicle : (value : VehicleTypes)=>void
}
const VehicleSelection = ({setVehiclePanel , setConfirmRidePanel , setVehicle}:VehicleSelectionType) => {
  return (
   <div className='w-full relative'>
       <div className="text-2xl top-0 absolute right-0" onClick={()=>setVehiclePanel(false)}><FaSortDown/></div>
      <p className='text-2xl font-semibold text-black mb-5 capitalize'>Choose a vehicle</p>  
 
     <VehicleCard setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} setVehicle={setVehicle}/>
   </div>
  )
}

export default VehicleSelection