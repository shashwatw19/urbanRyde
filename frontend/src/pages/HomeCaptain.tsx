import CaptainDetails from "../components/CaptainDetails";
import RidePopUP from "../components/RidePopUP";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
const HomeCaptain = () => {
  const [ridePopup , setRidePopup] = useState<boolean>(false);
  const ridePopUpRef = useRef(null)
  const [confirmRidePopup , setConfirmRidePopup] = useState<boolean>(false);
  const confirmRidePopupRef = useRef(null)
  const handleRidePopUp = ()=>{
  if(ridePopup){
    gsap.to(ridePopUpRef.current , {
      y: 0,  
      duration : 0.5,
      ease : "power2.out" 
    })
  }else{
    gsap.to(ridePopUpRef.current , {
      y: "100%",  
      duration : 0.5,
      ease : "power2.out"
    })
  }
}
const handleConfirmRidePopUp = ()=>{
  if(confirmRidePopup){
    gsap.to(confirmRidePopupRef.current , {
      y: 0,  
      duration : 0.5,
      ease : "power2.out" 
    })
  }else{
    gsap.to(confirmRidePopupRef.current , {
      y: "100%",  
      duration : 0.5,
      ease : "power2.out"
    })
  }
}
  useEffect(()=>{
    handleRidePopUp()
  },[ridePopup])
  useEffect(()=>{
    handleConfirmRidePopUp()
  },[confirmRidePopup])
  return (
    <div>
      <div className="h-screen  flex flex-col max-w-md mx-auto  bg-gray-50">
        {/* Map Section */}
        <div className="h-3/5 relative">
          <img
            className="h-full w-full object-cover"
            src="https://onefivenine.com/images/GoogleMapImages/22_7175_87.jpg"
            alt="Route Map"
          />
        </div>
       
        {/* Content Section */}
         <button onClick={()=>setRidePopup(true)}>Ride!!</button>
        <div className="h-2/5  ">
            <CaptainDetails/>

            <div ref={ridePopUpRef} className="fixed w-full bottom-0 translate-y-full  z-10 px-3 py-8  bg-white">
                <RidePopUP setRidePopup={setRidePopup} setConfirmRidePopup={setConfirmRidePopup}/>
            </div>

            <div ref={confirmRidePopupRef} className="fixed w-full bottom-0 translate-y-full  z-10  bg-white">
                <ConfirmRidePopUp setRidePopup={setRidePopup} setConfirmRidePopup={setConfirmRidePopup}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCaptain;
