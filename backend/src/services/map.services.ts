import axios from "axios";
import dotenv from 'dotenv'
import { Captain } from "../models/captain.model";
dotenv.config()
export type getAddressCondinatesType = {
    lat : number,
    lng : number
}
interface GooglePlacePrediction {
    description: string;
    place_id: string;
}

interface GooglePlacesResponse {
    status: string;
    predictions: GooglePlacePrediction[];
}
const getAddressCondinates = async(address : string) : Promise<getAddressCondinatesType>=>{
    const apiKey = process.env.GOOGLE_MAPS_API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
      try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                lat: location.lat ,
                lng: location.lng 
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }

}

const getDistanceTime = async(origin : string , destination : string)=>{
        if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {


        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getAutoCompleteSuggestions = async(input: string): Promise<string[]> => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get<GooglePlacesResponse>(url);
        if (response.data.status === 'OK') {
            
            return response.data.predictions
                .map((prediction: GooglePlacePrediction) => prediction.description)
                .filter((value: string) => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const getCaptainInRadius = async(lat: number, lng: number, radius: number ) => {
    try {
        console.log("Searching for captains with:", { lat, lng, radius });
        
        // Now use proper GeoJSON query
        const captains = await Captain.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat] // [longitude, latitude]
                    },
                    $maxDistance: radius * 1000 // radius in meters
                }
            }
        }).select('-password');
        
        console.log("Found captains:", captains);
        return captains;
    } catch (e) {
        console.log("error in getting captains in radius", e);
        return [];
    }
};
export {getAddressCondinates , getDistanceTime , getAutoCompleteSuggestions , getCaptainInRadius}
