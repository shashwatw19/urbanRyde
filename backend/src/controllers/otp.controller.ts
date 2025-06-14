import { Otp } from "../models/otp.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { validationResult } from "express-validator";
import { Request , Response } from "express";
const generateOtp = () : number =>{
   return Math.floor(100000 + Math.random() * 900000);
}
const createOtp = asyncHandler(async (req: Request, res: Response) => {
	
    const errors = validationResult(req)
   
     if(!errors.isEmpty()){
        console.log("error from otp " , errors)
        throw new ApiError(400 , 'invalid email'  )
    }
   
   
    const {email} = req.body
    const otp = generateOtp();
    const newOtp = await Otp.create({email , otp});

    if(!newOtp)
        return new ApiError(404 , 'not able to create otp')
    
    return res.status(201).json(
        new ApiResponse(200 , 'Otp generated successfully' , {otp : otp})
    )
});      


export {createOtp}