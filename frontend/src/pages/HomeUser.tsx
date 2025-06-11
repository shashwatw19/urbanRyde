import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { useState } from "react";
import gsap from "gsap";
import { FaSortDown} from "react-icons/fa";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleSelection from "../components/VehicleSelection";
import ConfirmRide from "../components/ConfirmRide";
import { VehicleTypes } from "../components/VehicleCard";
import LookingForDriver from "../components/LookingForDriver";
export type TripType = {
  pickup : string,
  destination : string
}
export type VehicleType = 'car' | 'auto' | 'bike' | null
const HomeUser = () => {
  const [trip , setTrip] = useState<TripType>({
    pickup : "",
    destination : ""
  })
  const [panelOpen , setPanelOpen] = useState<boolean>(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel , setVehiclePanel] = useState<boolean>(false)
  const vehiclePanelRef = useRef(null)
  const [confirmRidePanel , setConfirmRidePanel] = useState<boolean>(false)
  const confirmRideRef = useRef(null)
  const [vehicle , setVehicle] = useState<VehicleTypes>({
    img : "",
    name : "",
    tags : [],
    price : 0,
    type : null
  })
  const [lookingForDriver , setLookingForDriver] = useState<boolean>(false)
  const lookingForDriverRef = useRef(null)
  const [watingForDriver , setWaitingForDriver] = useState<boolean>(false)
  const changeHandler = (e :ChangeEvent< HTMLInputElement>)=>{
      const {name , value} = e.target
      setTrip({
        ...trip , [name] : value
      })
  }
  const submitHandler = (e : FormEvent)=>{
    e.preventDefault()
    console.log("trip details" , trip)
  }
  const handlePanelOpen = ()=>{
    if(panelOpen){
      gsap.to(panelRef.current , {
        height : '70%',
        duration: 0.3,
        ease: "power2.out"
      })
      gsap.to(panelCloseRef.current , {
        opacity : 1,
        duration: 0.3
      })
    }else{
      gsap.to(panelRef.current , {
        height : '0%',
        duration: 0.3,
        ease: "power2.out"
      })
      gsap.to(panelCloseRef.current , {
        opacity : 0,
        duration: 0.3
      })
    }
  }
const handleVehiclePanelOpen = ()=>{
  if(vehiclePanel){
    gsap.to(vehiclePanelRef.current , {
      y: 0,  
      duration : 0.5,
      ease : "power2.out" 
    })
  }else{
    gsap.to(vehiclePanelRef.current , {
      y: "100%",  
      duration : 0.5,
      ease : "power2.out"
    })
  }
}
const handleConfirmRidePanel = ()=>{
  if(confirmRidePanel){
    gsap.to(confirmRideRef.current , {
      y: 0,  
      duration : 0.5,
      ease : "power2.out" 
    })
  }else{
    gsap.to(confirmRideRef.current , {
      y: "100%",  
      duration : 0.5,
      ease : "power2.out"
    })
  }
}
const handleLookingForDriver = ()=>{
  if(lookingForDriver){
    gsap.to(lookingForDriverRef.current , {
      y: 0,  
      duration : 0.5,
      ease : "power2.out" 
    })
  }else{
    gsap.to(lookingForDriverRef.current , {
      y: "100%",  
      duration : 0.5,
      ease : "power2.out"
    })
  }
}
  useEffect(()=>{
    handlePanelOpen()
  },[panelOpen])
  useEffect(()=>{
    handleVehiclePanelOpen()
  },[vehiclePanel])
  useEffect(()=>{
    handleConfirmRidePanel()
  },[confirmRidePanel])
  useEffect(()=>{
    handleLookingForDriver()
  },[lookingForDriver])
  return (
    <div className="relative">
      <p className="text-4xl text-black p-7 absolute">UrbanRyde</p>
      <div className="h-screen w-screen  mx-auto" onClick={()=>setVehiclePanel(false)}>
        {/* image for temporary use */}
        <img
          className="h-full w-full object-cover "
          src="https://onefivenine.com/images/GoogleMapImages/22_7175_87.jpg"
        />
      </div>
      <div className="h-screen flex flex-col justify-end absolute top-0 w-full ">
        <div className="bg-white p-5 h-[30%]  relative ">
          <div className="flex flex-row items-start md:justify-start md:gap-60  justify-between">
            <h4 className="text-2xl font-semibold text-gray-900 capitalize">Find a trip</h4>
          
          <div ref={panelCloseRef} onClick={()=>setPanelOpen(false)} className="text-xl"><FaSortDown/></div>
          </div>
          <form onSubmit={submitHandler} className=" flex md:flex-row md:gap-12  md:items-center flex-col  gap-5 items-start justify-start flex-wrap mt-5 md:mt-10">
            <input
              className="bg-gray-100 w-full md:w-[30%]  px-8 py-2 text-base rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-100 "
              type="text"
              name="pickup"
              value={trip.pickup}
              onClick={()=>setPanelOpen(true)}
              placeholder="Add a pick-up location"
              onChange={changeHandler}
            ></input>

            
            <input
              className="bg-gray-100 w-full md:w-[30%] px-8 py-2 text-base rounded-lg  text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-100 "
              type="text"
              name="destination"
              value={trip.destination}
              onClick={()=>setPanelOpen(true)}
               onChange={changeHandler}
              placeholder="Enter your destination"
            ></input>
            <button className="bg-black font-semibold rounded-md px-4 py-2 text-base text-white ">Leave now</button>
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0 overflow-hidden ">
              <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}/>
        </div>
        <div ref={vehiclePanelRef} className="fixed w-full bottom-0 translate-y-full z-10 px-3 py-8  bg-white ">
            <VehicleSelection setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} setVehicle={setVehicle}/>
        </div>
        <div ref={confirmRideRef} className="fixed w-full bottom-0 translate-y-full z-10 px-3 py-8  bg-white ">
            <ConfirmRide vehicle={vehicle} setVehicle={setVehicle} setConfirmRidePanel={setConfirmRidePanel} setLookingForDriver={setLookingForDriver}/>
        </div>
        <div ref={lookingForDriverRef} className="fixed w-full bottom-0 translate-y-full z-10 px-3 py-8  bg-white ">
            <LookingForDriver vehicle={vehicle} setVehicle={setVehicle} setLookingForDriver={setLookingForDriver} setWaitingForDriver={setWaitingForDriver}  />
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
