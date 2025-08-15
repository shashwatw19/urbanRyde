import { useContext } from "react";
import { RideContext } from "../context/RideContext";
import LiveTracking from "../components/LiveTracking";
import { FaLocationPinLock } from "react-icons/fa6";

const UserOngoingRide = () => {
  
  const { ride,  loading,  } = useContext(RideContext);

 
  // const [rideStartTime] = useState(new Date());
  // const [elapsedTime, setElapsedTime] = useState(0);

  
  // useEffect(() => {
  //   const updateElapsedTime = () => {
  //     const now = new Date();
  //     const elapsed = Math.floor(
  //       (now.getTime() - rideStartTime.getTime()) / 60000
  //     );
  //     setElapsedTime(elapsed);
  //   };

  //   updateElapsedTime();
  //   const interval = setInterval(updateElapsedTime, 60000);
  //   return () => clearInterval(interval);
  // }, [rideStartTime]);

  const getRideStatusDisplay = () => {
    switch (ride?.status) {
      case "ongoing":
        return {
          text: "Ride in progress",
          color: "text-green-600",
          bgColor: "bg-green-50",
        };
      case "completed":
        return {
          text: "Ride completed",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
        };
      default:
        return {
          text: "Unknown status",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
        };
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="loader border-4 border-gray-300 border-t-blue-600 rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ride details...</p>
        </div>
      </div>
    );
  }


  const statusDisplay = getRideStatusDisplay();

  return (
    <div className="h-screen max-w-md mx-auto flex flex-col overflow-hidden">
      <div className="h-3/5 relative">
        <LiveTracking />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <h1 className="text-sm font-bold text-gray-800">UrbanRyde</h1>
        </div>

        <div
          className={`absolute top-2 right-2 ${statusDisplay.bgColor} backdrop-blur-sm rounded-lg px-2 py-1`}
        >
          <p className={`text-xs font-semibold ${statusDisplay.color}`}>
            {statusDisplay.text}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 overflow-y-hidden h-2/5">
        <div className="flex flex-col mt-3 justify-between h-[100%]">
          <div>
            <div className="space-y-3 p-3">
              {/* Pickup Location */}
              <div className="flex items-start gap-3 bg-green-100 p-3 rounded-lg border border-gray-200">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaLocationPinLock className="text-green-600 text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Pickup
                  </p>
                  <p className="text-sm font-semibold text-gray-900 truncate mt-1">
                    {ride?.pickup}
                  </p>
                </div>
              </div>

              {/* Destination Location */}
              <div className="flex items-start gap-3  bg-red-100 p-3 rounded-lg border border-gray-200">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaLocationPinLock className="text-red-600 text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Destination
                  </p>
                  <p className="text-sm font-semibold text-gray-900 truncate mt-1">
                    {ride?.destination}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Display */}
          <div
            className={`${statusDisplay.bgColor} border border-gray-200 bg-green-200 rounded-lg p-2 mx-3 mb-5`}
          >
            <div className="text-center">
              <p className={`text-base  font-semibold ${statusDisplay.color}`}>
                {statusDisplay.text}
              </p>
              {/* {ride?.status === "ongoing" && (
                <p className="text-xs text-gray-600 mt-1">
                  Started {elapsedTime} minutes ago
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserOngoingRide };
