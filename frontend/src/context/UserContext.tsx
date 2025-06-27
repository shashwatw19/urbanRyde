import { createContext, ReactNode, useState } from "react";
import { User } from "../types/userTypes";
import { Captain, SignUpCaptain } from "../types/captainTypes";
import { UserSignUpType } from "../types/userTypes";
import { useRef } from "react";
import { useEffect } from "react";

type UserContextProps = {
  children: ReactNode;
};
type UserContextTpye = {
  user: User | Captain;
  setUser: (value: User | Captain) => void;
  userSignupData: UserSignUpType | SignUpCaptain;
  setUserSignupData: (value: UserSignUpType | SignUpCaptain) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  handleCaptainData: (amount: number, trip: number, distace: number) => void;
  amount : number
  setAmount: (value: number) => void;
  trip : number | null,
  setTrip: (value: number) => void,
  distanceTravelled : number 
  setDistanceTravelled: (value: number) => void;
  setActiveHrs: (value: number) => void;
  sessionTime: number;
  getFormattedSessionTime: () => string;
  resetSessionTime: () => void;
};

export const UserDataContext = createContext<UserContextTpye>(
  {} as UserContextTpye
);

const UserContext = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<User | Captain>({
    _id: "",
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
    vehicle: {
      color: "",
      capacity: undefined,
      NumberPlate: "",
      vehicleType: null,
    },
  });
  const [userSignupData, setUserSignupData] = useState<
    UserSignUpType | SignUpCaptain
  >({
    email: "",
    password: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
    otp: "",
    vehicle: {
      color: "",
      capacity: undefined,
      NumberPlate: "",
      vehicleType: null,
    },
  });
  const [amount, setAmount] = useState<number>(0);
  const [trip, setTrip] = useState<number>(0);
  const [distanceTravelled, setDistanceTravelled] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeHrs, setActiveHrs] = useState<number>(0);

  const [sessionTime, setSessionTime] = useState<number>(0);
  const sessionStartTime = useRef<number>(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleCaptainData = (
    amount: number,
    trip: number,
    distanceTravelled: number 
  ) => {
    setTrip((prev) => prev + trip);
    setAmount((prev) => prev + amount);
    setDistanceTravelled((prev) => prev + distanceTravelled);
  };

  useEffect(() => {
    sessionStartTime.current = Date.now();

    intervalRef.current = setInterval(() => {
      const currentTime = Date.now();
      const timeSpent = Math.floor(
        (currentTime - sessionStartTime.current) / 1000
      );
      setSessionTime(timeSpent);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

  }, []);

  const getFormattedSessionTime = (): string => {
    const hours = Math.floor(sessionTime / 3600);
    const minutes = Math.floor((sessionTime % 3600) / 60);
    const seconds = sessionTime % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };


  const resetSessionTime = (): void => {
    sessionStartTime.current = Date.now();
    setSessionTime(0);
  };

  return (
    <div>
      <UserDataContext.Provider
        value={{
          user,
          setUser,
          userSignupData,
          setUserSignupData,
          loading,
          setLoading,
          setAmount,
          setDistanceTravelled,
          setTrip,
          setActiveHrs,
          handleCaptainData,
          sessionTime,
          getFormattedSessionTime,
          resetSessionTime,
          distanceTravelled,
          trip,
          amount
        }}
      >
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
