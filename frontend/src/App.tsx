import { Route , Routes } from "react-router-dom"
import HeroSection from "./pages/Herosection"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import CaptainSignup from "./pages/CaptainSignup"
import CaptainLogin from "./pages/CaptainLogin"
import VerifyEmail from "./pages/VerifyEmail"
import VerifyEmailCaptain from "./pages/VerifyEmailCaptain"
import UserRideCompleted from "./pages/UserRideCompleted"
import { UserProtectedWrapper } from "./pages/UserProtectedWrapper"
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper"
import { UserOngoingRide } from "./pages/UserOngoingRide"
import Home from "./pages/HomeUser"
import HomeCaptain from "./pages/HomeCaptain"
import { CaptainRiding } from "./pages/CaptainRiding"
function App() {
 
  return (
    <div>
   
       <Routes>
            <Route path={"/"} element={<HeroSection/>}></Route>
            <Route path={"/signup"} element={<Signup/>}></Route>
            <Route path={"/signin"} element={<Signin/>}></Route>
            <Route path={"/captain-signup"} element={<CaptainSignup/>}></Route>
            <Route path={"/captain-signin"} element={<CaptainLogin/>}></Route>
            <Route path={"/verify-email"} element={<VerifyEmail/>}></Route>
            <Route path="/verify-email-captain" element={<VerifyEmailCaptain/>}></Route>
            
            <Route element={
              <UserProtectedWrapper>
                <Home />
              </UserProtectedWrapper>
            } path="/user/home" />

            <Route element={
              <UserProtectedWrapper>
                <UserRideCompleted />
              </UserProtectedWrapper>
            } path="/user/ride-completed/:rideId?" />

            <Route element={
              <UserProtectedWrapper>
                <UserOngoingRide />
              </UserProtectedWrapper>
            } path="/user/ride/:rideId?" />

            <Route element={
              <CaptainProtectedWrapper>
                <HomeCaptain />
              </CaptainProtectedWrapper>
            } path="/captain/home" />

            <Route element={
              <CaptainProtectedWrapper>
                <CaptainRiding />
              </CaptainProtectedWrapper>
            } path="/captain/ride/:rideId?" />
          </Routes>
          
      
    </div>
  )
}

export default App
