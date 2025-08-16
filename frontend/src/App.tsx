import { Route , Routes } from "react-router-dom"
import HeroSection from "./pages/Herosection"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import CaptainSignup from "./pages/CaptainSignup"
import CaptainLogin from "./pages/CaptainLogin"
// import VerifyEmail from "./pages/VerifyEmail"
import VerifyEmailCaptain from "./pages/VerifyEmailCaptain"

import { UserProtectedWrapper } from "./pages/UserProtectedWrapper"
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper"
 import { useEffect } from "react";
import { clearCaptainStats } from "./utils/captainStatsPersistence"
import Home from "./pages/HomeUser"
import HomeCaptain from "./pages/HomeCaptain"

import NotFound from "./components/NotFound"
function App() {



  useEffect(() => {
    const handleUnload = () => {
      // Check if a ride is active
      const ride = localStorage.getItem("currentRide");
      let isRideActive = false;
      if (ride) {
        try {
          const rideObj = JSON.parse(ride);
          // You can adjust this check based on your RideType/status logic
          isRideActive = rideObj && rideObj.status && rideObj.status !== "completed" && rideObj.status !== "cancelled";
        } catch (e) {
          // If parsing fails, assume no active ride
          isRideActive = false;
        }
      }
      if (!isRideActive) {
        clearCaptainStats();
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  return (
    <div>
   
       <Routes>
            <Route path={"/"} element={<HeroSection/>}></Route>
            <Route path={"/signup"} element={<Signup/>}></Route>
            <Route path={"/signin"} element={<Signin/>}></Route>
            <Route path={"/captain-signup"} element={<CaptainSignup/>}></Route>
            <Route path={"/captain-signin"} element={<CaptainLogin/>}></Route>
            {/* <Route path={"/verify-email"} element={<VerifyEmail/>}></Route> */}
            <Route path="/verify-email-captain" element={<VerifyEmailCaptain/>}></Route>
            
            <Route element={
              <UserProtectedWrapper>
                <Home />
              </UserProtectedWrapper>
            } path="/user/home" />

           <Route element={
              <CaptainProtectedWrapper>
                <HomeCaptain />
              </CaptainProtectedWrapper>
            } path="/captain/home" />

            
            <Route path="*" element = {<NotFound></NotFound>}></Route>
          </Routes>
          
      
    </div>
  )
}

export default App
