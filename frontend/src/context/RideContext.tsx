import  { createContext, useState, ReactNode } from 'react';
import { RideType } from '../types/rideTypes';
import { verifyRide } from '../services/operations/ride/rideAuth';
import { saveRideData, getRideData, clearRideData } from "../utils/ridePersistence"
import { useEffect } from 'react';
// Context Type Definition
type RideContextType = {
  ride: Partial<RideType> | null;
  setRide: (ride:  Partial<RideType>  | null) => void;
  isValidRide: (rideId: string , userRole : 'user' | 'captain') => Promise<boolean>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  clearRide: () => void;
};


type RideContextProps = {
  children: ReactNode;
};

export const RideContext = createContext<RideContextType>({} as RideContextType);


const RideProvider = ({ children }: RideContextProps) => {
  
  const [ride, setRide] = useState< Partial<RideType>  | null>(() => getRideData());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

    
  const isValidRide = async (rideId: string , userRole : 'user' | 'captain'): Promise<boolean> => {
    if (!rideId) {
      setError('Ride ID is required');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Fetching ride with ID:', rideId);
      
      // Call the API service
      const response = await verifyRide(rideId , userRole);
      
      if (response && response.success) {
        const fetchedRide = response.data;
        setRide(fetchedRide);
        console.log('Ride fetched successfully:', fetchedRide);
        return true;
      } else {
        const errorMessage = response?.message || 'Failed to fetch ride';
        setError(errorMessage);
        console.error('Failed to fetch ride:', errorMessage);
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error fetching ride:', err);
      return false;
    } finally {
      setLoading(false);
    }
    
  };

  // Clear Error Function
  const clearError = () => {
    setError(null);
  };

  // Clear Ride Function
  const clearRide = () => {
    setRide(null);
    setError(null);
    clearRideData()
  };

   // Persist ride data on change
  useEffect(() => {
    saveRideData(ride);
  }, [ride]);

 

  return (
    <RideContext.Provider value={{ride, setRide, isValidRide,loading,error,clearError, clearRide}}>
      {children}
    </RideContext.Provider>
  );
};

export default RideProvider;