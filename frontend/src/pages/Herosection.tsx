import { Link } from "react-router-dom"
import HamburgerMenu from "../components/Hambuger"
import traffic1 from "../assets/traffic1.jpg"
import { AuthDataContext } from "../context/AuthContext"
import { useContext } from "react"
const HeroSection = () => {
  const {isAuthenticated , userRole ,userData} = useContext(AuthDataContext)
  
  return (
    <div>
      {/* Hero Banner */}
      <div className="h-screen pt-4 bg-center bg-cover flex justify-between items-start flex-col w-full relative"
        style={{ backgroundImage: `url(${traffic1})` }}>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 w-full flex flex-row justify-between items-start">
          <div>
            <p className="font-extrabold text-white text-5xl md:text-8xl p-4">UrbanRyde</p>
            <p className="text-white text-xl md:text-2xl px-5 font-medium">Ride. Arrive. Repeat.</p>
          </div>
          <HamburgerMenu isAuthenticated={isAuthenticated} userRole={userRole} userData={userData}/>
        </div>
        
        <div className="bg-white py-6 px-4 w-full flex gap-4 flex-col relative z-10">
          <div className="text-center ">
            <p className="text-3xl font-bold text-gray-900 mb-1">Get Started with UrbanRyde</p>
            <p className="text-gray-600 text-base">Book rides in seconds, arrive in minutes</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto w-full">
            <Link to={`${isAuthenticated ? (userRole == 'captain' ? '/captain/home' : '/user/home') : '/signin' }`}
              className="text-white text-center bg-black hover:bg-gray-800 transition-colors rounded-full px-6 font-semibold py-3 flex-1">
              Get Started
            </Link>
          
          </div>
        </div>
      </div>

    
    </div>
  )
}

export default HeroSection