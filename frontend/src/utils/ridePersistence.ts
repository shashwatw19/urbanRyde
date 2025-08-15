import { RideType } from "../types/rideTypes";

const RIDE_DATA_KEY = "currentRide";
const RIDE_ID = 'currentRideId'


export const saveRideData = (data: Partial<RideType> | null) => {
  if (data) localStorage.setItem(RIDE_DATA_KEY, JSON.stringify(data));
  else localStorage.removeItem(RIDE_DATA_KEY);
};

export const getRideData = (): Partial<RideType> | null => {
  const stored = localStorage.getItem(RIDE_DATA_KEY);
  return stored ? (JSON.parse(stored) as Partial<RideType>) : null;
};

export const clearRideData = () => {
  localStorage.removeItem(RIDE_DATA_KEY);
};

export const saveRideId = (data : string | null) => {
    if(data) localStorage.setItem(RIDE_ID , JSON.stringify(data))
}

export const getRideId = (): string | null => {
  const stored = localStorage.getItem(RIDE_ID);
  return stored ? (JSON.parse(stored)) : null;
};
export const clearRideId = () =>{
     localStorage.removeItem(RIDE_ID);
}