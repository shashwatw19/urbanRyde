import { FaLocationDot } from "react-icons/fa6"

const locations = [
    "8/31 Vijay Nagar, Indore, Behind Sica School",
    "12 MG Road, Near Treasure Island Mall, Indore",
    "45 Scheme No 54, Opposite C21 Mall, Indore",
    "101 New Palasia, Near Industry House, Indore",
    "22 Rajendra Nagar, Near Railway Station, Indore",
    "67 Sudama Nagar, Sector D, Indore"
];
type LocationSearchPanelTypes = {
  
  setVehiclePanel : ( value : boolean)=>void
  setPanelOpen : (value : boolean) => void

}
const LocationSearchPanel = ({setVehiclePanel , setPanelOpen} : LocationSearchPanelTypes) => {
  const handlePanelOpens = ()=>{
    setVehiclePanel(true)
    setPanelOpen(false)
  }
  return ( 
    <div className="h-full p-4">
       {
            locations.map((location , index)=>{
                return  <div key={index} onClick={()=>handlePanelOpens()} className="flex gap-4 items-center active:border  active:border-gray-600 border border-gray-200 rounded-xl p-2  justify-start my-2">
            <span className="text-gray-800 w-6 h-6 rounded-full flex  p-1 items-center bg-gray-200"><FaLocationDot/></span>
            <h4 className="text-gray-800 font-medium capitalize">{location}</h4>
        </div>
            })
        }
    </div>
  )
}

export default LocationSearchPanel