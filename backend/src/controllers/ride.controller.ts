import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { Ride } from "../models/ride.model";
import { Request , Response } from "express";
import { Result, validationResult } from "express-validator";
import { getFare } from "../services/ride.services";
import { ApiResponse } from "../utils/ApiResponse";


const generateOtp = () : number =>{
   return Math.floor(100000 + Math.random() * 900000);
}

const createRide = asyncHandler(async(req : Request , res : Response)=>{
    const errors :Result = validationResult(req)
    if(!errors.isEmpty()){
        const errorMessage : string[] = errors.array()
        throw new ApiError(400 , 'invalid input fields' , false , errorMessage) 
    }
    const {  pickup , destination ,vehicleType  } = req.body
    let fare: { car: number; auto: number; moto: number } | undefined;
    try {
        fare = await getFare(pickup, destination);
    } catch (e) {
        console.log("error while generating fare", e);
    }
    if (!fare) {
        throw new ApiError(500, "Failed to calculate fare");
    }
    const rideFare: number = fare[vehicleType as keyof typeof fare];
    const newRide = await Ride.create({
        user : req.user?._id,
        pickup,
        destination,
        vehicleType,
        fare: rideFare,
        otp: generateOtp()
    });

    return res.status(201).json(
        new ApiResponse(200 , 'ride created successfully ' , newRide)
    );

})

const getFareForTrip = asyncHandler(async(req : Request , res : Response)=>{
    const errors : Result = validationResult(req)

    if(!errors.isEmpty()){
        const errorMessage : string[] = errors.array()
        throw new ApiError(400 , 'Invalid Fields' , false , errorMessage)
    }

    const {pickup , destination } = req.body

    try{
        const fare = await getFare(pickup , destination)
        return res.status(200).json(
            new ApiResponse(200 , 'fare calculated for trip' , fare)
        )
    }catch(e){
        console.error("errro while calculating fare" , e)
        throw new ApiError(404 , ' not able to calculate fare')
    }
})

export {createRide , getFareForTrip}