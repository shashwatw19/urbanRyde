import { ChangeEvent, FormEvent, useContext, useEffect, useRef } from "react";
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
import UserRideCompleted from "./UserRideCompleted";
import { SocketContext } from "../context/socketContext";
import { AuthDataContext } from "../context/AuthContext";
import { RideType } from "../types/rideTypes";
import LiveTracking from "../components/LiveTracking";
import { RideContext } from "../context/RideContext";
import { UserOngoingRide } from "./UserOngoingRide";
import { getModalState , saveModalState } from "../utils/modalState";
import { saveRideId , getRideId } from "../utils/ridePersistence";
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

  
  // ****************suggestion system starts from here********************
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
  // **************suggestion system ends here**************************

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
    if (paymentRequest) {
    setPaymentRequest(true);
    toast.info("Complete your payment to finish the ride");
    return;
  }
  
  if (rideStarted) {
    setRideStarted(true);
    toast.info("Your ride is in progress");
    return;
  }
  
  if (watingForDriver) {
    setWaitingForDriver(true);
    toast.info("Your driver is on the way");
    return;
  }
  
  if (lookingForDriver) {
    setLookingForDriver(true);
    toast.info("Searching for available drivers");
    return;
  }
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
  const [lookingForDriver, setLookingForDriver] = useState<boolean>(() => getModalState("lookingForDriver"));
  const lookingForDriverRef = useRef(null)
  const [watingForDriver, setWaitingForDriver] = useState<boolean>(() => getModalState("watingForDriver"));
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
const handleOnGoingRide = ()=>{
  if(rideStarted){
    gsap.to(rideStartedRef.current , {
      y: 0,  
      duration : 0.5,
      ease : "power2.out" 
    })
  }else{
    gsap.to(rideStartedRef.current , {
      y: "100%",  
      duration : 0.5,
      ease : "power2.out"
    })
  }
}
const handleRidePayment = ()=>{
  if(paymentRequest){
    gsap.to(paymentRequestRef.current , {
      y: 0,  
      duration : 0.5,
      ease : "power2.out" 
    })
  }else{
    gsap.to(paymentRequestRef.current , {
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



    //***************connecting to sockets*********
    const {socket} = useContext(SocketContext)
    const {userData} = useContext(AuthDataContext)
    const {setRide} = useContext(RideContext)
    
    
   
    //states for managing ride
    const [rideStarted, setRideStarted] = useState(() => getModalState("rideStarted"));
    const rideStartedRef = useRef(null)
    const {ride, isValidRide,  error, clearError } = useContext(RideContext);
    const [paymentRequest, setPaymentRequest] = useState(() => getModalState("paymentRequest"));
    const paymentRequestRef = useRef(null)

    //for handling on going ride modal
    useEffect(()=>{
      handleOnGoingRide()
    },[rideStarted])

    //for handling payment and ride ending modal
    useEffect(()=>{
      handleRidePayment()
    },[paymentRequest])


    useEffect(() => {
      if (socket && userData) {
          console.log("Joining socket room for user:", userData._id);
          socket.emit("join", { userId: userData._id, userRole: "user" });
      } 
    }, [socket, userData]);

    // on ride accepted
    const handleRideAccepted = (data : RideType) => {
          console.log("Ride accepted data received:", data);
          setRide(data)
          setLookingForDriver(false);
          setWaitingForDriver(true);
          toast.success('Your ride has been accepted!');
    };
    useEffect(() => {
      if (lookingForDriver && socket && userData) {
          console.log("Setting up Ride-Accepted listener");
          socket.on("Ride-Accepted", handleRideAccepted);
          
          return () => {
              console.log("Cleaning up Ride-Accepted listener");
              socket.off("Ride-Accepted", handleRideAccepted);
          };
      }
    }, [lookingForDriver, socket, userData]);

    //on ride started
    const handleRideStarted = async(data : RideType) =>{
      console.log("Ride-Started data recieved " ,data)
      
      const validRide = await isValidRide(data._id , 'user');
      if(validRide){
        setRide(data)
        setWaitingForDriver(false);
        setRideStarted(true)
        toast.success('Your ride has been started!');
      }
      else{
        toast.error(error)
        clearError()
      }
    }

    const handlePaymentRequest = async(data : RideType)=>{
       if ( ride && ride._id == data._id) {
          const validRide = await isValidRide(data._id , 'user');
          if(validRide){
            setRideStarted(false)
            setPaymentRequest(true)
          }
        }
        console.log("payment request recieved", data);
    }
    useEffect(() => {
      if (socket && userData) {
          socket.on("Ride-Started", handleRideStarted);
          return () => {
              console.log("Cleaning up Ride-Started listener");
              socket.off("Ride-Started", handleRideStarted);
          };
      }
    }, [socket, userData]); 

    //requesting for payment
    useEffect(() => {
    if (socket && ride?._id) {
      socket.on("Payment-Request", handlePaymentRequest);
      return () => {
        socket.off("Payment-Request");
      };
    }
  }, [socket, ride?._id]);

  //storing rideId is case of canceling ride
  const[rideId , setRideId] = useState<string | null>(()=>getRideId())


   // Save to localStorage whenever state changes
  useEffect(() => { saveModalState("lookingForDriver", lookingForDriver); }, [lookingForDriver]);
  useEffect(() => { saveModalState("watingForDriver", watingForDriver); }, [watingForDriver]);
  useEffect(() => { saveModalState("rideStarted", rideStarted); }, [rideStarted]);
  useEffect(() => { saveModalState("paymentRequest", paymentRequest); }, [paymentRequest]);
  useEffect(() => { saveRideId(rideId); }, [rideId])

  return (
    <div className="max-w-md mx-auto w-full relative">
      <div className="h-screen flex flex-col mx-auto bg-gray-100"> 
      <div className="h-[70%] w-full relative ">
            <LiveTracking/>
            <p className="absolute top-2 flex items-center  p-3 text-2xl font-bold  text-gray-800 rounded-xl pointer-events-none">
              UrbanRyde
            </p>
        </div>

      <div className="h-screen flex flex-col justify-end absolute top-0 w-full">
        {/* search input feilds */}
        <div className="bg-white px-3 py-4 h-[30%] relative"> 
          
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xl font-semibold text-gray-900">Find a trip</h4> 
            <div ref={panelCloseRef} onClick={()=>setPanelOpen(false)} className="text-lg cursor-pointer"> 
              <FaSortDown/>
            </div>
          </div>
          
          <form onSubmit={submitHandler} className="flex flex-col gap-4"> 
            <div className="relative">
              <input
                className="bg-gray-100 w-full pl-8 pr-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" /* Reduced padding and font size */
                type="text"
                name="pickup"
                value={trip.pickup}
                onClick={()=>setPanelOpen(true)}
                placeholder="Add a pick-up location"
                onFocus={() => handleInputFocus('pickup')}
                onChange={changeHandler}
              />
              <FaLocationDot className="text-gray-600 absolute top-3 left-2.5 text-sm"/> 
            </div>
            <div className="relative">
              <input
                className="bg-gray-100 w-full pl-8 pr-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" /* Reduced padding and font size */
                type="text"
                name="destination"
                value={trip.destination}
                onClick={()=>setPanelOpen(true)}
                onFocus={() => handleInputFocus('destination')}
                onChange={changeHandler}
                placeholder="Enter your destination"
              />
              <FaLocationPinLock className="text-gray-600 absolute top-3 left-2.5 text-sm"/> 
            </div>
            
            <button 
              onClick={()=>handleLeaveNow()} 
              className={'font-semibold rounded-lg px-4 py-2.5 w-full text-sm text-white flex items-center justify-center gap-2 mt-5 bg-gray-900 hover:bg-gray-800'} >
              <FaRegClock className="text-sm"/>
            
                Leave Now
            </button>
          </form>
        </div>
        {/* search modal open */}
        <div ref={panelRef} className="bg-white h-0 overflow-hidden">
          <LocationSearchPanel 
            setPanelOpen={setPanelOpen} 
            setVehiclePanel={setVehiclePanel} 
            suggestions={suggestions} 
            onSuggestionSelect={handleSuggestionSelect} 
            trip={trip}
          />
        </div>

        {/* vehicle selection  */}
        <div ref={vehiclePanelRef} className="fixed w-full bottom-0 translate-y-full z-10 bg-white">
          <VehicleSelection 
            fare={fare} 
            setVehiclePanel={setVehiclePanel} 
            setConfirmRidePanel={setConfirmRidePanel} 
            setVehicle={setVehicle}
          />
        </div>

        {/* confirm ride  */}
        <div ref={confirmRideRef} className="fixed w-full bottom-0 translate-y-full z-10 bg-white">
          <ConfirmRide 
           setVehiclePanel={setVehiclePanel} 
            fare={fare} 
            trip={trip} 
            vehicle={vehicle} 
            setRideId = {setRideId}
            setConfirmRidePanel={setConfirmRidePanel} 
            setLookingForDriver={setLookingForDriver}
          />
        </div>

        {/* looking for driver  */}
        <div ref={lookingForDriverRef} className="fixed w-full bottom-0 translate-y-full bg-white">
          <LookingForDriver 
            setVehiclePanel={setVehiclePanel} 
            setLookingForDriver={setLookingForDriver} 
            setWaitingForDriver={setWaitingForDriver} 
            setConfirmRidePanel={setConfirmRidePanel} 
            setRideId={setRideId}
            rideId = {rideId}
          />
        </div>

        {/* wating for driver  */}
        <div ref={watingforDriverRef} className="fixed w-full bottom-0 translate-y-full bg-white">
          <WatingForDriver 
            vehicle={vehicle} 
            setVehicle={setVehicle} 
            setWaitingForDriver={setWaitingForDriver}  
          />
        </div>

        {/* ongoing ride  */}
        <div ref={rideStartedRef} className="fixed w-full bottom-0 translate-y-full bg-white">
          <UserOngoingRide/>
        </div>

        {/* payment section */}
        <div ref={paymentRequestRef} className="fixed w-full bottom-0 translate-y-full bg-white">
          <UserRideCompleted setPaymentRequest={setPaymentRequest} setLookingForDriver = {setLookingForDriver}
          setWaitingForDriver = {setWaitingForDriver}
          setRideStarted = {setRideStarted} setTrip={setTrip}/> 
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomeUser;
