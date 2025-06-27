import { useContext, useEffect, useState } from 'react';
import { RideContext } from '../context/RideContext';
import LiveTracking from '../components/LiveTracking';
import {  FaLocationPinLock } from 'react-icons/fa6';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../context/socketContext';

const UserOngoingRide = () => {
  const navigate = useNavigate();
  const { ride, isValidRide, loading, error, clearError } = useContext(RideContext);
  const { rideId } = useParams<{ rideId?: string }>();
  const {socket} = useContext(SocketContext)
  const [rideStartTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);

  console.log("rideID", rideId);
  const hasValidRideId = rideId && rideId.trim().length > 0;

  const handleVerifyRide = async () => {
    if (rideId) await isValidRide(rideId, 'user');
  };


  useEffect(() => {
    if (hasValidRideId) {
      handleVerifyRide();
    }
  }, [rideId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
        if (socket && ride?._id) {
            socket.on('Payment-Request', (data) => {
                if(ride._id == data._id){
                  navigate(`/user/ride-completed/${ride._id}`)
                }
                console.log("payment request recieved" , data)
            });
        return () => {
              socket.off('Payment-Request')
          }
        }
    }, [socket, ride?._id])

  useEffect(() => {
    const updateElapsedTime = () => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - rideStartTime.getTime()) / 60000);
      setElapsedTime(elapsed);
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 60000);
    return () => clearInterval(interval);
  }, [rideStartTime]);


  const handleMessage = () => {
    toast.info('Messaging feature coming soon');
  };

  const getRideStatusDisplay = () => {
    switch (ride?.status) {
      case 'ongoing':
        return { text: 'Ride in progress', color: 'text-green-600', bgColor: 'bg-green-50' };
      case 'completed':
        return { text: 'Ride completed', color: 'text-gray-600', bgColor: 'bg-gray-50' };
      default:
        return { text: 'Unknown status', color: 'text-gray-600', bgColor: 'bg-gray-50' };
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


  if (!hasValidRideId) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Active Ride</h2>
          <p className="text-gray-600 mb-4">You don't have any ongoing rides</p>
          <button
            onClick={() => navigate('/user/home')}
            className="bg-black text-white px-6 py-2 rounded-lg font-medium"
          >
            Book a Ride
          </button>
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

        <div className={`absolute top-2 right-2 ${statusDisplay.bgColor} backdrop-blur-sm rounded-lg px-2 py-1`}>
          <p className={`text-xs font-semibold ${statusDisplay.color}`}>
            {statusDisplay.text}
          </p>
        </div>
      </div>

      
      <div className="bg-white overflow-y-hidden h-2/5">
        <div className="flex flex-col justify-between gap-6 mt-3">
            <div className="space-y-2 p-3 ">
              <div className="flex items-start gap-2 rounded-lg">
                <FaLocationPinLock className="text-gray-800 text-base mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-600">Pickup</p>
                  <p className="text-base font-semibold text-gray-900 truncate">{ride?.pickup}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 p-3">
              <div className="flex items-start gap-2  bg-gray-50 rounded-lg">
                <FaLocationPinLock className="text-gray-800 text-base mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-600">Destination</p>
                  <p className="text-base font-semibold text-gray-900 truncate">{ride?.destination}</p>
                </div>
              </div>
            </div>
            <div className={`${statusDisplay.bgColor} border border-gray-200 rounded-lg p-2`}>
              <div className="text-center">
                <p className={`text-base font-semibold ${statusDisplay.color}`}>
                  {statusDisplay.text}
                </p>
                {ride?.status === 'ongoing' && (
                  <p className="text-xs text-gray-600 mt-1">
                    Started {elapsedTime} minutes ago
                  </p>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserOngoingRide };