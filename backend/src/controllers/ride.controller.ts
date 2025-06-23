import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { Ride } from "../models/ride.model";
import { Request , Response } from "express";
import { Result, validationResult } from "express-validator";
import { getFare } from "../services/ride.services";
import { ApiResponse } from "../utils/ApiResponse";
import { getAddressCondinates , getCaptainInRadius } from "../services/map.services";
import { getAddressCondinatesType } from "../services/map.services";
import { sendMessageToSocketId } from "../socket";
import mongoose from "mongoose";
import { User } from "../models/user.model";

export type RideType = {
    user : string,
    pickup : string,
    destination : string,
    vehicleType : 'car' | 'auto' | 'moto',
    fare: number,
}
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

    res.status(201).json(
        new ApiResponse(200 , 'ride created successfully ' , newRide)
    );

    // ride has been created , now finding captains near the user
    const cordinates : getAddressCondinatesType = await getAddressCondinates(pickup)
   
    const captainsNearUser = await getCaptainInRadius(cordinates.lat , cordinates.lng , 2);

    newRide.otp  = undefined


    const ride = await Ride.findById(newRide._id).populate('user').select('-otp -password')
    captainsNearUser?.map((captain)=>{
        sendMessageToSocketId(captain.socketId , 'New-Ride' , ride)
    })

    console.log("captainsNear Me" , captainsNearUser)
})

const getFareForTrip = asyncHandler(async(req : Request , res : Response)=>{
    const errors : Result = validationResult(req)

    if(!errors.isEmpty()){
        const errorMessage : string[] = errors.array()
        throw new ApiError(400 , 'Invalid Fields' , false , errorMessage)
    }

    const {pickup , destination } = req.query

    try{
        const fare = await getFare(pickup as string , destination as string)
        return res.status(200).json(
            new ApiResponse(200 , 'fare calculated for trip' , fare)
        )
    }catch(e){
        console.error("errro while calculating fare" , e)
        throw new ApiError(404 , ' not able to calculate fare')
    }
})

const confirmRide = asyncHandler(async(req : Request , res : Response)=>{
    const error : Result = validationResult(req)
    if(!error.isEmpty()){
        const errrorMessage = error.array()
        throw new ApiError(400 , 'Invalid Fields' , false , errrorMessage)
    }

    const {rideId} = req.body

    const ride = await Ride.findByIdAndUpdate(rideId , {
        captain : req.user?._id,
        status: 'accepted'
    }, { new: true })
    .populate('user', '-password')
    .populate('captain', '-password')
    .select('+otp')
    
    if(!ride){
        throw new ApiError(404 , 'Ride not found' )
    }
    const user = await User.findById(ride.user?._id);
    if(!user)
        throw new ApiError(404 , 'user not found ');
  
    const socketId = user.socketId;

    console.log("sending ride-confirmation to socket id" , socketId)

    sendMessageToSocketId(socketId! , "Ride-Accepted" , ride);

    return res.status(200).json(
        new ApiResponse(200 , 'Ride Confirmed ' , ride)
    );
})

const startRide = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessage: string[] = errors.array();
        throw new ApiError(400, 'Invalid Fields', false, errorMessage);
    }

    const { rideId, otp, userSocketId } = req.body;

    if (!rideId || !otp || !userSocketId) {
        throw new ApiError(400, 'Missing required fields: rideId, otp, or userSocketId');
    }

    const validRide = await Ride.findOne({ _id: rideId, otp: otp });

    if (!validRide) {
        throw new ApiError(404, 'invalid ride or otp');
    }

    // Check if captain user exists
    if (!req.user || !req.user._id) {
        throw new ApiError(401, 'Captain not authenticated');
    }

    // Update ride status and assign captain
    validRide.status = 'ongoing';
    validRide.captain = new mongoose.Types.ObjectId((req.user?._id).toString());

    try {
        await validRide.save({ validateBeforeSave: false });

        const updatedRide = await Ride.findById(validRide?._id)
            .populate('user', '-password')
            .populate('captain', '-password')
            .select('-otp');

        // Send response
        res.status(200).json(
            new ApiResponse(200, 'Ride confirmed successfully and ready to start', updatedRide!)
        );

        if (userSocketId) {
            sendMessageToSocketId(userSocketId, 'Ride-Started', updatedRide);
        } else {
            console.warn('userSocketId is missing, cannot send socket message.');
        }

    } catch (error) {
        console.error("Error while confirming ride:", error);
        throw new ApiError(500, 'Failed to confirm ride');
    }
});

const isValidRideUser = asyncHandler(async(req : Request  , res : Response)=>{
    const errors : Result = validationResult(req)

    if(!errors.isEmpty()){
        const errorMessage : string[]= errors.array();
        throw new ApiError(400 , 'invalid fields' , false , errorMessage)
    }

    const userId = req.user?._id
    const {rideId} = req.body
    console.log("rideId " , rideId)
    const validRide = await Ride.findOne({_id :rideId , user : userId }).
    populate('user').select('-pasword').populate('captain').select('-password')

    if(!validRide){
        throw new ApiError(404 , 'ride not found')
    }

    return res.status(200).json(
        new ApiResponse(200 , 'valid ride' ,validRide)
    )
})
const isValidRideCaptain = asyncHandler(async(req : Request  , res : Response)=>{
    const errors : Result = validationResult(req)

    if(!errors.isEmpty()){
        const errorMessage : string[]= errors.array();
        throw new ApiError(400 , 'invalid fields' , false , errorMessage)
    }

    const captainId = req.user?._id
    const {rideId} = req.body

    const validRide = await Ride.findOne({_id :rideId , captain : captainId }).
    populate('user').select('-pasword').populate('captain').select('-password')

    if(!validRide){
        throw new ApiError(404 , ' ride not found')
    }

    return res.status(200).json(
        new ApiResponse(200 , 'valid ride' ,validRide)
    )
})
const paymentRequest = asyncHandler(async(req : Request , res : Response)=>{
    const errors : Result = validationResult(req)
    if(!errors.isEmpty()){
        const errorMessage : string[] = errors.array()
        throw new ApiError(400 , 'invalid fields' , false , errorMessage)
    }
    const {rideId  , userSocketId } = req.body

    const ride = await Ride.findById(rideId).populate('user').select('-password').populate('captain').select('-password')

    if(!ride || ride.status != 'ongoing'){
        throw new ApiError(404 , 'invalid ride')
    }

    ride.status = 'completed'

    await ride.save({validateBeforeSave : false})
    if (userSocketId) {
            sendMessageToSocketId(userSocketId, 'Payment-Request', ride);
    } else {
            console.warn('userSocketId is missing, cannot send socket message.');
    }

    return res.status(200).json(
        new ApiResponse(200 , 'ride is valdi and request for payment sent to user')
    )
})
export {createRide , getFareForTrip, startRide  , confirmRide , isValidRideUser , isValidRideCaptain , paymentRequest}

