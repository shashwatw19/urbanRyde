import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { captainLogout, userLogout } from '../services/operations/user/auth';
import { User } from '../types/userTypes';
import { Captain } from '../types/captainTypes';
import { toast } from 'sonner';
import { AuthDataContext } from '../context/AuthContext';
import { saveModalState } from '../utils/modalState';
import { clearRideId } from '../utils/ridePersistence';
import { clearRideData } from '../utils/ridePersistence';
interface HamburgerMenuProps {
  isAuthenticated?: boolean;
  userRole?: 'user' | 'captain' | null,
  userData?: User | Captain | null,

}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ 
  isAuthenticated = false, 
  userRole = null,
  
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {userData} = useContext(AuthDataContext)
  const menuRef = useRef<HTMLDivElement>(null);
  const {setUserData , setUserRole ,setIsAuthenticated} = useContext(AuthDataContext)
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      let response;

      if (userRole === 'user') {
        response = await userLogout();
      } else if (userRole === 'captain') {
        response = await captainLogout();
      }
     
      if (response && userRole ==='captain') {
        toast.success('logged out!');
        setUserData(null)
        setUserRole(null)
        setIsAuthenticated(false)
        saveModalState("captain_ridePopup", false);
        saveModalState("captain_confirmRidePopup",false )
        saveModalState("captain_captainRiding",false )
        saveModalState("captain_completeRide",false )
        
        saveModalState("captain_paymentRequest", false)
        saveModalState("captain_paymentCompleted",false )
        saveModalState("captain_waitingForPayment",false )
        saveModalState("captain_requestingPayment", false)
        clearRideData()
      }
      else if(response && userRole === 'user'){
        toast.success('logged out!');
        setUserData(null)
        setUserRole(null)
        setIsAuthenticated(false)
        saveModalState("lookingForDriver", false); 
         saveModalState("watingForDriver", false);
         saveModalState("rideStarted", false); 
         saveModalState("paymentRequest", false); 
         clearRideId();
         clearRideData()
        
      }
      else {
        toast.error('error while logout!');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
    closeMenu();
  }

  return (
    <div className="relative p-3" ref={menuRef}>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg duration-200 "
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex items-center justify-center">
          {isOpen ? (
            <FaTimes className="text-gray-100 text-xl transition-transform duration-200" />
          ) : (
            <FaBars className="text-gray-100 text-xl transition-transform duration-200" />
          )}
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Menu Dropdown */}
      <div
        className={`absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 transform transition-all duration-200 ease-out ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="py-2">
          {!isAuthenticated ? (
            <>
              {/* Sign Up Option */}
              <Link
                to="/signup"
                onClick={closeMenu}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150 group"
              >
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-150">
                  <span className="text-white text-sm font-semibold">S</span>
                </div>
                <div>
                  <div className="font-medium">Sign Up</div>
                  <div className="text-sm text-gray-500">Create new account</div>
                </div>
              </Link>

              <hr className="border-gray-100" />

              {/* Login Option */}
              <Link
                to="/signin"
                onClick={closeMenu}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150 group"
              >
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-150">
                  <span className="text-white text-sm font-semibold">L</span>
                </div>
                <div>
                  <div className="font-medium">Login</div>
                  <div className="text-sm text-gray-500">Access your account</div>
                </div>
              </Link>
            </>
          ) : (
            <>
              {/* User Profile Section */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">U</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Welcome back!</div>
                    <div className="text-sm text-gray-500 capitalize">{userData?.fullname.firstname} {userData?.fullname.lastname}</div>
                  </div>
                </div>
              </div>
              {/* Logout Option */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150 text-left"
              >
                <span className="font-medium">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;