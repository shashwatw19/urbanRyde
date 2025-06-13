import { FaClock } from "react-icons/fa6";
import { SiSpeedtest } from "react-icons/si";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
const CaptainDetails = () => {
  return (
    <div className='bg-white p-6 flex flex-col gap-5 justify-start'>
        <div className="p-3 ">
            <div className="flex justify-between items-start ">
              {/* Driver & Vehicle Info - Simplified */}
              <div className="bg-white rounded-lg w-full ">
                <div className="flex items-center gap-3">
                  {/* Driver Avatar */}
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-gray-700">S</span>
                  </div>

                  {/* Driver Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">Shashwat Wawge</p>
                    
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500 text-xs" />
                      <span className="text-sm text-gray-600">4.6</span>
                    </div>
                  </div>

                  {/* Earning INfo */}
                  <div className="text-start p-3">
                    <p className="text-xl font-semibold">₹1000</p>
                    <p className="text-sm font-medium text-gray-600 text-center">Earned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row itesms-center justify-between p-3 bg-gray-100 rounded-xl">
            <div className="text-center">
              <FaClock className="text-2xl font-thin mx-auto "/>  
              <h4 className="text-lg font-medium" >10.2Hrs</h4>
              <p  className="text-sm text-gray-600">Online</p>
            </div>
            <div className="text-center">
              <SiSpeedtest className="text-2xl font-thin mx-auto"/>
              <h4 className="text-lg font-medium" >10.2Hrs</h4>
              <p className="text-sm text-gray-600">Online</p>
            </div>
            <div className="text-center">
              <FaRegNoteSticky className="text-2xl font-thin mx-auto "/>
              <h4 className="text-lg font-medium" >10.2Hrs</h4>
              <p className="text-sm text-gray-600">Online</p>
            </div>
          </div>
    </div>
  )
}

export default CaptainDetails