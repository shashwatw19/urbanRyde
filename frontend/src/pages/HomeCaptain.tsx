import CaptainDetails from "../components/CaptainDetails";
import RidePopUP from "../components/RidePopUP";
import gsap from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { AuthDataContext } from "../context/AuthContext";
import { SocketContext } from "../context/socketContext";
import { CaptainRiding } from "./CaptainRiding";
import LiveTracking from "../components/LiveTracking";
import { RideContext } from "../context/RideContext";
import { RideCompleted } from "../components/RideCompleted"
import { toast } from "sonner";
import { UserDataContext } from "../context/UserContext";
import { saveModalState , getModalState } from "../utils/modalState";
const HomeCaptain = () => {
  const [ridePopup, setRidePopup] = useState<boolean>(() => getModalState("captain_ridePopup"));
  const ridePopUpRef = useRef(null)
  
  const [confirmRidePopup, setConfirmRidePopup] = useState<boolean>(() => getModalState("captain_confirmRidePopup"));
  const {userData } = useContext(AuthDataContext)
  
  const [captainRiding, setCaptainRiding] = useState<boolean>(() => getModalState("captain_captainRiding"));
  const captaingRidingRef = useRef(null)

  const [completeRide, setCompleteRide] = useState<boolean>(() => getModalState("captain_completeRide"));
  const completeRideRef = useRef(null)

  const confirmRidePopupRef = useRef(null)


  //payment states 
  const [paymentRequest, setPaymentRequested] = useState<boolean>(() => getModalState("captain_paymentRequest"));
  const [paymentCompleted, setPaymentCompleted] = useState<boolean>(() => getModalState("captain_paymentCompleted"));
  const [waitingForPayment, setWaitingForPayment] = useState<boolean>(() => getModalState("captain_waitingForPayment"));
  const [requestingPayment, setRequestingPayment] = useState<boolean>(() => getModalState("captain_requestingPayment"));
  
  const {handleCaptainData} = useContext(UserDataContext)
  
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
const handleCaptainRiding = ()=>{
    if(captainRiding){
    gsap.to(captaingRidingRef.current , {
      y: 0,  
      duration : 0.5,
      ease : "power2.out" 
    })
  }else{
    gsap.to(captaingRidingRef.current , {
      y: "100%",  
      duration : 0.5,
      ease : "power2.out"
    })
  }
}
const handleCompleteRide = () => {
        if (completeRide) {
            gsap.to(completeRideRef.current, {
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            })
        } else {
            gsap.to(completeRideRef.current, {
                y: "100%",
                duration: 0.5,
                ease: "power2.out"
            })
        }
    }
  useEffect(()=>{
    handleRidePopUp()
  },[ridePopup])
  useEffect(()=>{
    handleConfirmRidePopUp()
  },[confirmRidePopup])
  useEffect(()=>{
    handleCaptainRiding()
  },[captainRiding])
   useEffect(() => {
        handleCompleteRide()
    }, [completeRide])


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
  const { ride , setRide} = useContext(RideContext)
  console.log("ride remaning " , ride)
  useEffect(() => {
    if (socket && userData) {
      const handleNewRide = async(data: any) => {
        console.log("data for new Ride", data);
        setRide(data)
        setRidePopup(true)
        toast.info('New Ride Available')
        
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

  useEffect(() => {
        if (socket && ride?._id) {
            socket.on('payment-completed', (data) => {
                console.log('Payment completed received:', data);
                if (data.rideId === ride._id) {
                  setPaymentCompleted(true)  
                  setWaitingForPayment(false);
                  setPaymentRequested(true);
                  setRequestingPayment(false)
                  
                  setCaptainRiding(false)
                  
                  toast.success('Payment received! You can now finish the ride.');
                  handleCaptainData(ride.fare! , 1 , ride?.distance!)
                }
            });
            socket.on('payment-failed', (data) => {
                console.log("payment failed recieved", data)
                if (data.rideId === ride._id) {
                    setWaitingForPayment(false)
                    toast.error('Payment failed or cancled')
                }
            })

            return () => {
                socket.off('payment-completed')
                socket.off('payment-falied')
            }
        }
    }, [socket, ride?._id])

//sync state to local changes
useEffect(() => { saveModalState("captain_ridePopup", ridePopup); }, [ridePopup]);
useEffect(() => { saveModalState("captain_confirmRidePopup", confirmRidePopup); }, [confirmRidePopup]);
useEffect(() => { saveModalState("captain_captainRiding", captainRiding); }, [captainRiding]);
useEffect(() => { saveModalState("captain_completeRide", completeRide); }, [completeRide]);

useEffect(() => { saveModalState("captain_paymentRequest", paymentRequest); }, [paymentRequest]);
useEffect(() => { saveModalState("captain_paymentCompleted", paymentCompleted); }, [paymentCompleted]);
useEffect(() => { saveModalState("captain_waitingForPayment", waitingForPayment); }, [waitingForPayment]);
useEffect(() => { saveModalState("captain_requestingPayment", requestingPayment); }, [requestingPayment]);


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
                <ConfirmRidePopUp  setConfirmRidePopup={setConfirmRidePopup} setCaptainRiding={setCaptainRiding}/>
            </div>

            <div ref={captaingRidingRef} className="fixed w-full bottom-0 translate-y-full  z-10  bg-white">
              <CaptainRiding setCompleteRide={setCompleteRide}/>
            </div>

            <div ref={completeRideRef} className="fixed w-full bottom-0 translate-y-full  z-10  bg-white">
              <RideCompleted setCompleteRide={setCompleteRide}  paymentRequest = {paymentRequest} setPaymentRequested={setPaymentRequested} waitingForPayment={waitingForPayment} 
              setWaitingForPayment={setWaitingForPayment} requestingPayment={requestingPayment} setRequestingPayment={setRequestingPayment} paymentCompleted = {paymentCompleted} 
              setPaymentCompleted={setPaymentCompleted} setRidePopup = {setRidePopup} setConfirmRidePopup = {setConfirmRidePopup}  setCaptainRiding = {setCaptainRiding} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCaptain;
