import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { useState } from "react";
import gsap from "gsap";
import { FaSortDown} from "react-icons/fa";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleSelection from "../components/VehicleSelection";
import ConfirmRide from "../components/ConfirmRide";
import { VehicleTypes } from "../components/VehicleCard";
import LookingForDriver from "../components/LookingForDriver";
import WatingForDriver from "../components/WatingForDriver";
import { useDebounce } from "../hooks/useDebounce";
import { getSuggestions } from "../services/operations/map/getSuggestion";
import { FaLocationDot, FaLocationPinLock } from "react-icons/fa6"
import { FaRegClock } from "react-icons/fa6";
import { toast } from "sonner";
import { getFareForTrip } from "../services/operations/ride/tripSetup";
export type fareType = {
  car: number | undefined,
  auto : number | undefined,
  moto : number | undefined
}
export type Suggestions = string[]

export type SuggestionState = {
  pickup : Suggestions,
  destination : Suggestions,
  loading : Boolean ,
  activeField : 'pickup' | 'destination' | null
}

export type TripType = {
  pickup : string,
  destination : string
}

export type VehicleType = 'car' | 'auto' | 'moto' | null

const HomeUser = () => {
  
  // suggestion system starts from here
  const [trip , setTrip] = useState<TripType>({
    pickup : "",
    destination : ""
  })
  
  const [suggestions, setSuggestions] = useState<SuggestionState>({
    pickup: [],
    destination: [],
    loading: false,
    activeField: null
  });
  
  const debouncedPickup = useDebounce(trip.pickup, 300);
  const debouncedDestination = useDebounce(trip.destination, 300);
  
  const handleInputFocus = (field: 'pickup' | 'destination') => {
    setSuggestions(prev => ({ ...prev, activeField: field }));
    setPanelOpen(true);
  };
  const fetchSuggestions = async (input: string, field: 'pickup' | 'destination') => {
    setSuggestions(prev => ({ ...prev, loading: true }));
    
    try {
      const results = await getSuggestions(input);
      setSuggestions(prev => ({
        ...prev,
        [field]: results,
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions(prev => ({
        ...prev,
        [field]: [],
        loading: false
      }));
    }
  };
  // Fetch suggestions for pickup
  useEffect(() => {
    if (debouncedPickup && suggestions.activeField === 'pickup') {
      fetchSuggestions(debouncedPickup, 'pickup');
    }
  }, [debouncedPickup, suggestions.activeField]);
  // Fetch suggestions for destination
  useEffect(() => {
    if (debouncedDestination && suggestions.activeField === 'destination') {
      fetchSuggestions(debouncedDestination, 'destination');
    }
  }, [debouncedDestination, suggestions.activeField]);

  
  
  const handleSuggestionSelect = (suggestion: Suggestions, field: 'pickup' | 'destination' , index : number) => {
    setTrip(prev => ({
      ...prev,
      [field]: suggestion[index]
    }));
    
    setSuggestions(prev => ({
      ...prev,
      [field]: [],
      activeField: null
    }));
    
   
  };

  const clearSuggestions = () => {
    setSuggestions({
      pickup: [],
      destination: [],
      loading: false,
      activeField: null
    });
  };
  // suggestion system ends here

  // setting up fare for trip 
  const [fare , setFare] = useState<fareType>({
    car : undefined,
    auto : undefined,
    moto : undefined
  })
  const setupFareForTrip = async(pickup : string , destination : string) : Promise<boolean>=>{
      try{
        const fare : fareType = await getFareForTrip(pickup , destination)
        setFare(fare)
        return true
      }catch(e){
        console.log("error in setupFareForTrip" , e)
        return false
      }
  }
  const handleLeaveNow = async()=>{
  if(trip.pickup && trip.destination && trip.pickup.length >2 && trip.destination.length > 2 ){
    if(await setupFareForTrip(trip.pickup , trip.destination )){
        clearSuggestions()
        setPanelOpen(false)
        setVehiclePanel(true)
    }
    else{
      toast.error("Not Able To Create Trip for You . Please Try Again In Some Time")
    }
   

  }else{
    toast.info('Select Pickup And Destination To Begin Ride')
  }
}
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
    
    type : null
  })
  const [lookingForDriver , setLookingForDriver] = useState<boolean>(false)
  const lookingForDriverRef = useRef(null)
  const [watingForDriver , setWaitingForDriver] = useState<boolean>(false)
  const watingforDriverRef = useRef(null)
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
const handleWatingForDriver = ()=>{
  if(watingForDriver){
    gsap.to(watingforDriverRef.current , {
      y: 0,  
      duration : 0.5,
      ease : "power2.out" 
    })
  }else{
    gsap.to(watingforDriverRef.current , {
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
   useEffect(()=>{
    handleWatingForDriver()
  },[watingForDriver])
  return (
    <div className="relative overflow-x-hidden">
      <p className="text-4xl text-black p-7 font-semibold absolute">UrbanRyde</p>
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
          <form onSubmit={submitHandler} className=" flex md:flex-row  md:items-center flex-col  gap-4 items-start justify-start flex-wrap mt-5 md:mt-10">
            <div className="w-full relative">
              <input
              className="bg-gray-100 w-full md:w-[30%]  px-8 py-2 text-base font-medium rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-100 "
              type="text"
              name="pickup"
              value={trip.pickup}
              onClick={()=>setPanelOpen(true)}
              placeholder="Add a pick-up location"
              onFocus={() => handleInputFocus('pickup')}
              onChange={changeHandler}
            ></input>
                  <FaLocationDot className="text-gray-600 absolute top-3 left-2"/>
            </div>

            
            <div className="w-full relative">
              <input
              className="bg-gray-100 w-full md:w-[30%] px-8 py-2 text-base font-medium rounded-lg  text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-100 "
              type="text"
              name="destination"
              value={trip.destination}
              onClick={()=>setPanelOpen(true)}
              onFocus={() => handleInputFocus('destination')}
              onChange={changeHandler}
              placeholder="Enter your destination"
            ></input>

            <FaLocationPinLock className="text-gray-600 absolute top-3 left-2"/>
            </div>
            

          <button onClick={()=>handleLeaveNow()} className="bg-gray-900 font-semibold rounded-md px-4 py-2 text-base text-white flex items-center gap-2"><FaRegClock/>Leave now</button>
          
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0 overflow-hidden ">
              <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} suggestions={suggestions} onSuggestionSelect={handleSuggestionSelect} trip={trip}/>
        </div>
        <div ref={vehiclePanelRef} className="fixed w-full bottom-0 translate-y-full z-10 px-3 py-8  bg-white ">
            <VehicleSelection fare={fare} setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} setVehicle={setVehicle}/>
        </div>
        <div ref={confirmRideRef} className="fixed w-full bottom-0 translate-y-full z-10 px-3 py-8  bg-white ">
            <ConfirmRide vehicle={vehicle} setVehicle={setVehicle} setConfirmRidePanel={setConfirmRidePanel} setLookingForDriver={setLookingForDriver}/>
        </div>
        <div ref={lookingForDriverRef} className="fixed w-full bottom-0 translate-y-full z-10 px-3 py-8  bg-white ">
            <LookingForDriver vehicle={vehicle} setVehicle={setVehicle} setLookingForDriver={setLookingForDriver} setWaitingForDriver={setWaitingForDriver}  />
        </div>
        <div ref={watingforDriverRef} className="fixed w-full bottom-0 translate-y-full z-10 px-3 py-8  bg-white ">
            <WatingForDriver vehicle={vehicle} setVehicle={setVehicle} setLookingForDriver={setLookingForDriver} setWaitingForDriver={setWaitingForDriver}  />
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
