import {  FaLocationDot } from "react-icons/fa6"
import { Suggestions, TripType } from "../pages/HomeUser";
import { SuggestionState } from "../pages/HomeUser";


type LocationSearchPanelTypes = {
  
  setVehiclePanel : ( value : boolean)=>void
  setPanelOpen : (value : boolean) => void
  suggestions : SuggestionState
  onSuggestionSelect: (suggestion: Suggestions, field: 'pickup' | 'destination' , index: number) => void;
  trip : TripType
}
const LocationSearchPanel = ({  suggestions , onSuggestionSelect } : LocationSearchPanelTypes) => {
 
  const renderSuggestions = ()=>{
    const {activeField , loading} = suggestions
    
        if (loading) {
            // loader while suggestions are fetched
            return (
                <div className="p-4 mt-12">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        const currentSuggestions = suggestions[activeField!];

        if (currentSuggestions?.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center h-64 text-center text-base text-gray-500">
                    <FaLocationDot className="text-base mx-auto mb-2 opacity-50"/>
                    <p>No suggestions found</p>
                </div>
            );
        }
        return (
            <div className="p-4 mt-8">
                <h3 className="text-sm px-3 font-semibold text-gray-600 uppercase tracking-wide mb-3">
                    {activeField === 'pickup' && 'Select Pickup Location'}
                </h3>
                <h3 className="text-sm px-3 font-semibold text-gray-600 uppercase tracking-wide mb-3">
                    {activeField === 'destination' && 'Select Destination Location'}
                </h3>
                {currentSuggestions?.map((suggestion, index : number) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200"
                        onClick={() => onSuggestionSelect(currentSuggestions, activeField! , index)}
                    >
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaLocationDot className="text-blue-600 text-sm"/>
                        </div>
                        <div className="flex-1  min-w-0">
                            <p className="text-sm font-medium text-gray-900 ">
                                {suggestion}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
  }
  return (
        <div className="h-full bg-white max-w-md mx-auto">
         {/* Suggestions */}
            <div className="flex-1 overflow-y-auto">
                {renderSuggestions()}
            </div>
        </div>
    );
}

export default LocationSearchPanel