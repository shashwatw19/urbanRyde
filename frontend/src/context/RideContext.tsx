import  { createContext, useState, ReactNode } from 'react';
import { RideType } from '../types/rideTypes';
import { verifyRide } from '../services/operations/ride/rideAuth';

// Context Type Definition
type RideContextType = {
  ride: RideType | null;
  setRide: (ride: RideType | null) => void;
  isValidRide: (rideId: string , userRole : 'user' | 'captain') => Promise<RideType | null>;
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
  
  const [ride, setRide] = useState<RideType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

    
  const isValidRide = async (rideId: string , userRole : 'user' | 'captain'): Promise<RideType | null> => {
    if (!rideId) {
      setError('Ride ID is required');
      return null;
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
        return fetchedRide;
      } else {
        const errorMessage = response?.message || 'Failed to fetch ride';
        setError(errorMessage);
        console.error('Failed to fetch ride:', errorMessage);
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error fetching ride:', err);
      return null;
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
  };

 

  return (
    <RideContext.Provider value={{ride, setRide, isValidRide,loading,error,clearError, clearRide}}>
      {children}
    </RideContext.Provider>
  );
};

export default RideProvider;