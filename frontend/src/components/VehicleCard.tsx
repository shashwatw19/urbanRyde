import car from "../assets/car.webp"
import bike from "../assets/bike.webp"
import auto from "../assets/auto.webp"
import { VehicleType } from "../pages/HomeUser"

export type VehicleTypes = {
    img : string,
    name : string,
    tags : string[],
    price : number,
    type : VehicleType
    time? : number ,
    fair?: number
}
const vehicleTypes : VehicleTypes[] = [
    {  
        img : car,
        name : "urbango",
        tags : ["Comfortable" , "Economy" , "compact rides"],
        price : 100,
        type : 'car'
    },
    {  
        img : auto,
        name : "urban auto",
        tags : ["Affordable" , "Pocket Friendly" , "City rides"],
        price : 200,
        type : 'auto'
    },
    {  
        img : bike,
        name : "moto",
        tags : ["Time Saving" , "City Rides" , "Avoids traffic"],
         price : 80,
         type : 'bike'
    }
]
type VehicleCardProps = {
    setConfirmRidePanel : (value : boolean)=>void
    setVehiclePanel : (value : boolean)=>void
    setVehicle : (value : VehicleTypes)=>void
}
const VehicleCard = ({ setConfirmRidePanel , setVehiclePanel , setVehicle }: VehicleCardProps) => {
    const handlePanelOpen = (value : VehicleTypes)=>{
            setConfirmRidePanel(true)
            setVehiclePanel(false)
            setVehicle(value)
    }
  return (
    <div>
        
        {
            vehicleTypes.map((vehicle : VehicleTypes , index : number)=>{
                return <div key={index} onClick={()=>handlePanelOpen(vehicle)} className='flex flex-row gap-2 border active:border-black bg-gray-100 rounded-xl items-center justify-start b w-[100%] p-3 mb-2'>
                        <img className='h-16 ' src={vehicle.img}/>
                        <div className=' w-1/2'>
                            <p className=' text-base text-black capitalize font-medium'>{vehicle.name}</p>
                            <div className=' text-gray-700 text-xs '>
                                <span className='capitalize '>{vehicle.tags[0]}</span>
                                <span className='ml-1 capitalize'>{vehicle.tags[1]}</span>
                                <span className='ml-1 capitalize'> {vehicle.tags[2]}</span>
                            </div>
                        </div>
                        <p className='font-semibold text-xl '>₹{vehicle.price}</p>
                </div>
            })
        }
    </div>
  )
}

export default VehicleCard