import { VehicleTypes } from "../components/VehicleCard";
import car from "../assets/car.webp";
import auto from "../assets/auto.webp";
import bike from "../assets/bike.webp";
import { FaCar, FaMoneyCheck, FaStar } from "react-icons/fa";
import { FaLocationPinLock } from "react-icons/fa6";

const vehicle: VehicleTypes = {
  name: "UberGo",
  type: "car",
  price: 110,
  img: car,
  tags: ["affordable", "City Rides", "Economy"],
};

const Riding = () => {
  const getVehicleImage = (vehicle: VehicleTypes) => {
    switch (vehicle.type) {
      case "car":
        return car;
      case "auto":
        return auto;
      case "bike":
        return bike;
      default:
        return car;
    }
  };

  return (
    <div className="h-screen flex flex-col max-w-md mx-auto overflow-hidden bg-gray-50">
      {/* Map Section */}
      <div className="h-1/2 relative">
        <img
          className="h-full w-full object-cover"
          src="https://onefivenine.com/images/GoogleMapImages/22_7175_87.jpg"
          alt="Route Map"
        />

        {/* Status Overlay */}
      </div>

      {/* Content Section */}
      <div className="h-1/2 bg-white p-4 flex flex-col gap-3  ">
        {/* Driver & Vehicle Info */}
        <div className="p-3">
          <div className="flex justify-between items-start ">
            {/* Driver & Vehicle Info - Simplified */}
            <div className="bg-white rounded-lg  w-full ">
              <div className="flex items-center gap-3">
                {/* Driver Avatar */}
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-gray-700">S</span>
                </div>

                {/* Driver Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">Shashwat</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500 text-xs" />
                    <span className="text-sm text-gray-600">4.6</span>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="text-start p-3">
                  <div className="text-right space-y-1">
                    <div className="flex items-center justify-end gap-1">
                      <FaCar className="text-gray-400 text-xs" />
                      <p className="text-sm font-medium text-gray-900">
                        {vehicle.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 italic">Maruti Swift</p>
                    <div className="inline-block bg-gradient-to-r from-gray-700 to-gray-900 text-white px-2 py-1 rounded-md">
                      <p className="text-xs font-bold uppercase tracking-wider">
                        MP 09 AB 1234
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="flex-1 space-y-3">
          {/* Destination */}
          <div className="flex items-center gap-3 p-3  border border-gray-100 rounded-lg">
            <div className="p-2 bg-red-100 rounded-full">
              <FaLocationPinLock className="text-gray-900 text-sm" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">75-C Vandana Nagar</p>
              <p className="text-sm text-gray-600">Near Bengali Square</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <FaMoneyCheck className="text-green-600 text-sm" />
              </div>
              <div>
                <p className="text-xl font-bold text-green-600">
                  ₹{vehicle.price}
                </p>
                <p className="text-xs text-gray-600">Trip Fare</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">Payment</p>
              <p className="text-xs text-gray-500">Cash • UPI • Wallet</p>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button className="w-full bg-green-600 text-white py-2  rounded-xl font-semibold text-lg ">
          Complete Payment
        </button>

        <div className="flex justify-center mt-2">
          <p className="text-xs text-gray-500">
            Secure payment • Trip will end after payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default Riding;
