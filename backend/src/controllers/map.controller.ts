import { asyncHandler } from "../utils/AsyncHandler";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError";
import { Result } from "express-validator";
import { getAddressCondinates , getDistanceTime , getAutoCompleteSuggestions } from "../services/map.services";
import { ApiResponse } from "../utils/ApiResponse";
import { Response , Request } from "express";
const getCoordinates = asyncHandler(async(req ,res)=>{
    const errors :Result = validationResult(req)
    if(!errors.isEmpty()){
        const errorMessage : string[]= errors.array()
        return new ApiError(400 , 'Invalid Input fields' , false , errorMessage )
    }
    const {address} = req.query
    try{
        const coordintes = await getAddressCondinates(address as string)
        return res.status(200).json(
            new ApiResponse(200 , 'Corodinates found' , coordintes)
        )
    }catch(e){
        throw res.status(404).json(
            new ApiError(404 , 'coordinates not found')
        )
    }
})

const getDistanceTimeForTrip = asyncHandler(async(req : Request, res : Response)=>{
    const errors : Result = validationResult(req)
    if(!errors.isEmpty()){
        const errorMessage : string[] = errors.array()
        return new ApiError(400 , 'Invalid Input Fields', false , errorMessage )
    }

    const {origin , destination}  = req.query
   
    try{
        const distanceTime = await getDistanceTime(origin as string , destination  as string)
        return res.status(200).json(
            new ApiResponse(200 , 'distance time for trip' , distanceTime)
        )
    }catch(e){
        console.error(e)
        throw new ApiError(404 , 'not able to find distance time for the trip')
    }
})

const getSuggestions = asyncHandler(async(req : Request , res : Response)=>{
    const errors : Result = validationResult(req)
    if(!errors.isEmpty()){
        const errorMessage : string[] = errors.array()
        return new ApiError(400 , 'Invalid input fields' , false , errorMessage)
    }

    const {input} = req.query

    try{
        const suggestions = await getAutoCompleteSuggestions(input as string)
        return res.status(200).json(
            new ApiResponse(200 , 'suggesstion found' , suggestions)
        )
    }catch(e){
        console.error("error in get suggestions" , e)
        throw new ApiError(404 , 'suggestion not found' )
    }

})

//remaning auto complete suggestions.......................

export {getCoordinates , getDistanceTimeForTrip , getSuggestions }