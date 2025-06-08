import { Captain } from "../models/captain.model";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { Response , Request } from "express";
import { validationResult , Result, cookie } from "express-validator";
import { Otp } from "../models/otp.model";
import { BlackListedToken } from "../models/blackListedToken.model";

// register captain
const registerCaptain = asyncHandler(async(req : Request , res : Response )=>{
    const errors :Result = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessage : string[] = errors.array()
        console.log("error message" , errorMessage)
        throw new ApiError(411 , 'invalid field input' , false , errorMessage)
    }

    const {otp , email , password , vehicle , fullname } = req.body;

    let currentOtp = otp;
    const generatedOtp = await Otp.find({email}).sort({createdAt : -1}).limit(1)
    
    if(!generatedOtp)
        throw new ApiError(404 , `Otp not found with ${email}` );
    if(generatedOtp[0]?.otp != currentOtp)
        throw new ApiError(401 , 'Invalid Otp')

    const validUser = await Captain.findOne({email : email})

    if(validUser){
        throw new ApiError(401 , 'user already exist')
    }

    const newUser = await Captain.create({
        email : email,
        fullname : {
            firstname : fullname.firstname,
            lastname : fullname.lastname
        },
        vehicle : {
            color : vehicle.color,
            NumberPlate : vehicle.NumberPlate,
            capacity : vehicle.capacity,
            vehicleType : vehicle.vehicleType
        },
        password : password
    })

    if(!newUser){
        throw new ApiError(401 , 'not able to register captain')
    }
    const accessToken = newUser.generateAccessToken();

    const payload = {
        secure : true,
        httpOnly : true,
        maxAge : 1 * 24 * 60 * 60 * 1000
    }
    newUser.password = undefined
    return res.status(200).cookie("accessToken" , accessToken , payload).json(
         new ApiResponse(200 , 'captain registered successfully' , newUser)
    )

})
//login captain
const loginCaptain = asyncHandler(async(req : Request , res : Response)=>{
    const errors : Result = validationResult(req)

    if(!errors.isEmpty()){
        const errorMessage : string[] = errors.array()
        throw new ApiError(401 , 'invalid fields' , false , errorMessage)
    }

    const {password , email } = req.body

    const validUser = await Captain.findOne({email : email})

    if(!validUser){
        throw new ApiError(404 , 'user not found')
    }

    if(!validUser.comparePassword(password)){
        throw new ApiError(401 , 'invalid Password')
    }

    const accessToken = validUser.generateAccessToken()
    const options = {
        secure : true,
        httpOnly : true,
        maxAge : 2 * 24 * 60 * 60 * 1000 
    }
    validUser.password = undefined
    return res.status(200).cookie("accessToken" , accessToken, options).json(
        new ApiResponse(200 , 'user logged in successfully!' , validUser)
    )
})
//getCaptainProfile

const getCaptainProfile = asyncHandler(async(req : Request , res : Response)=>{
    const captain_id = req.user?._id

    const findCaptain = await Captain.findById(captain_id);
    if(!findCaptain){
        throw new ApiError(404 , 'captain not found')
    }
    return res.status(200).json(
        new ApiResponse(200 , 'captain found' , findCaptain)
    )
})
// logout captain
const logout = asyncHandler(async(req : Request , res : Response)=>{
    const accessToken = req.cookies?.accessToken
    const username = req.user?.firstname
    await BlackListedToken.create({
        token : accessToken
    })
    
    return res.status(200).clearCookie("accessToken", { httpOnly: true, secure: true }).json(
        new ApiResponse(200 , 'user logged out successfully' , username)
    )
})

export {registerCaptain , loginCaptain , logout , getCaptainProfile}