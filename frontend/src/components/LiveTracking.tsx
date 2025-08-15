
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useState , useEffect } from 'react'
import { useCallback } from 'react'
import { Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%',
  margin: 'auto',
  padding: '5px',
  borderRadius: '10px',
  overflow: 'hidden',
}

const center = {
  lat: 22.7196,
  lng: 75.8577,
}

const LiveTracking = ()=>{
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API}`,
  })
  const [currentPosition , setCurrentPosition] = useState<{lat : number , lng : number}>(center)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback(function callback(map : google.maps.Map) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])
  
  useEffect(() => {
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Position updated:', latitude, longitude);
          
          const newPosition = {
            lat: latitude,
            lng: longitude
          };
          
          setCurrentPosition(newPosition);
          
          // Update map center when position changes
          if (map) {
            map.panTo(newPosition);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Keep using fallback center if geolocation fails
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000 // Cache position for 1 minute
        }
      );
    };

    updatePosition(); 
    const intervalId = setInterval(updatePosition, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId)
  }, [map]); // Add map to dependencies

  return isLoaded ? (
    <div className='w-full h-full'>
        <GoogleMap 
          mapContainerStyle={containerStyle}
          center={currentPosition} // Use currentPosition instead of center
          zoom={14} // Moderate zoom level (not too close, not too far)
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
            gestureHandling: 'greedy',
            scrollwheel: true, // allow scroll to zoom
          }}
        >
          <Marker 
            position={currentPosition}
            
          />
        </GoogleMap>
    </div>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
      <div className="loader" style={{
        border: '8px solid #f3f3f3',
        borderTop: '8px solid #3498db',
        borderRadius: '50%',
        width: '45px',
        height: '45px',
        animation: 'spin 1s linear infinite'
      }} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      Initialising Map
    </div>
  )
}

export default LiveTracking