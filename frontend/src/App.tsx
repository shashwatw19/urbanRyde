import { Route , Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import CaptainSignup from "./pages/CaptainSignup"
import CaptainLogin from "./pages/CaptainLogin"
import VerifyEmail from "./pages/VerifyEmail"
import VerifyEmailCaptain from "./pages/VerifyEmailCaptain"
function App() {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home/>}></Route>
        <Route path={"/signup"} element={<Signup/>}></Route>
        <Route path={"/signin"} element={<Signin/>}></Route>
        <Route path={"/captain-signup"} element={<CaptainSignup/>}></Route>
        <Route path={"/captain-signin"} element={<CaptainLogin/>}></Route>
        <Route path={"/verify-email"} element={<VerifyEmail/>}></Route>
        <Route path="/verify-email-captain" element={<VerifyEmailCaptain/>}></Route>
      </Routes>
    </div>
  )
}

export default App
