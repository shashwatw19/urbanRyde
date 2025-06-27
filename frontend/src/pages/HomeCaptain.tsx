import CaptainDetails from "../components/CaptainDetails";
import RidePopUP from "../components/RidePopUP";
import gsap from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { AuthDataContext } from "../context/AuthContext";
import { SocketContext } from "../context/socketContext";
import { RideType } from "../types/rideTypes";
import LiveTracking from "../components/LiveTracking";
import { RideContext } from "../context/RideContext";
import { UserDataContext } from "../context/UserContext";

const HomeCaptain = () => {
  const [ridePopup , setRidePopup] = useState<boolean>(false);
  const ridePopUpRef = useRef(null)
  const [confirmRidePopup , setConfirmRidePopup] = useState<boolean>(false);
  const {userData } = useContext(AuthDataContext)
  
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
  
  
  //connecting to socket
  const {socket} = useContext(SocketContext)
  
  useEffect(() => {
      const updateLocation = () => {
        if (navigator.geolocation && userData && socket) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
             
              socket.emit("update-captain-location", {
                userId: userData._id,
                location,
              });
            },
            (error) => {
              console.log("some error in fetching captains location" , error)
            }
          );
        }

      };

    updateLocation(); // Initial call

    const intervalId = setInterval(updateLocation, 10000); 

    return () => clearInterval(intervalId);
  }, [userData, socket]);

  // setting the data for ride popup
  const {ride , setRide} = useContext(RideContext)

  useEffect(() => {
    if (socket && userData) {
      const handleNewRide = (data: any) => {
        console.log("data for new Ride", data);
        setRide(data);
        setRidePopup(true);
      };
      socket.on('New-Ride', handleNewRide);

      return () => {
        socket.off('New-Ride', handleNewRide);
      };
    }
  }, [socket, userData, setRide]);
   
  useEffect(()=>{
      if(userData && socket){
        
        socket?.emit("join" , {userId : userData._id , userRole : 'captain'})
      }
  } , [socket , userData]) 
  return (
    <div className="max-w-md mx-auto w-full ">
      <div className="h-screen flex flex-col mx-auto bg-gray-100">
        {/* Map Section */}
        <div className="h-3/5 w-full relative ">
            <LiveTracking/>
            <p className="absolute top-2 flex items-center  p-3 text-2xl font-bold  text-gray-800 rounded-xl ">
              UrbanRyde
            </p>
        </div>
       
        {/* Content Section */}
        
        <div className="h-2/5">
            <CaptainDetails/>

            <div ref={ridePopUpRef} className="fixed w-full bottom-0 translate-y-full  z-10 px-3 py-8  bg-white">
                <RidePopUP  setRidePopup={setRidePopup} setConfirmRidePopup={setConfirmRidePopup}/>
            </div>

            <div ref={confirmRidePopupRef} className="fixed w-full bottom-0 translate-y-full  z-10  bg-white">
                <ConfirmRidePopUp  setRidePopup={setRidePopup} setConfirmRidePopup={setConfirmRidePopup}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCaptain;
