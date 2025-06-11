import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";
import { Result, validationResult , ValidationError } from "express-validator";
import e, { Request , Response } from "express";
import { Otp } from "../models/otp.model";
import { BlackListedToken } from "../models/blackListedToken.model";

const signup = asyncHandler(async(req : Request , res : Response)=>{
    const errors : Result   = validationResult(req)

     if (!errors.isEmpty()) {
        const errorMessages : string[] =  errors.array()
       throw new ApiError(422, 'Validation failed' , false , errorMessages);
    }

    const {otp , email , fullname , password} = req.body

    
    let currentOtp = otp;
    const generatedOtp = await Otp.find({email}).sort({createdAt : -1}).limit(1)

    if(!generatedOtp)
        throw new ApiError(404 , `Otp not found with ${email}` );
    if(generatedOtp[0]?.otp != currentOtp)
        throw new ApiError(400 , 'Invalid Otp')


    const ifUserExists = await User.findOne({email : email})

    if(ifUserExists){
        throw new ApiError(409 , 'User already exists')
    }

  

    const newUser = await User.create({
        email : email,
        password : password,
        fullname : {
            firstname : fullname.firstname,
            lastname : fullname.lastname
        }
    })

    if(!newUser){
        throw new ApiError(500 , 'not able to create user')
    }
    
    const token = newUser.generateAccessToken()

    const options = {
        secure : true,
        httpOnly : true,
        maxAge :  2 * 24 * 60 * 60 * 1000  // 2 days in milliseconds
        
    }
    newUser.password = undefined
    return res.status(200).cookie("accessToken" , token , options).json(
        new ApiResponse( 200 , 'user registered' , newUser)
    )
})
const signin = asyncHandler(async(req : Request , res : Response)=>{
    const errors : Result = validationResult(req);

    if(!errors.isEmpty()){
        const errorMessage : string[] = errors.array();
        throw new ApiError(422 , "invalid fields" , false , errorMessage)
    }


    const {email , password} = req.body
    
    const validUser = await User.findOne({email  : email})

    if(!validUser)
        throw new ApiError(404 , 'User not found');

    if( !await validUser.matchPassword(password)){
        throw new ApiError(401 , 'Invalid credentials')
    }

    const accessToken = validUser.generateAccessToken()
    const options = {
        secure : true,
        httpOnly : true,
        maxAge : 2 * 24 * 60 * 60 * 1000
    }

    validUser.password = undefined

    return res.status(200).cookie("accessToken" , accessToken , options).json(
        new ApiResponse(200 , 'logged in success!' , validUser)
    )
})
const logout = asyncHandler(async(req : Request,res : Response)=>{
    const userId = req.user?._id
    const accessToken = req?.cookies?.accessToken
    const validUser = await User.findById(userId)

    if(!validUser)
        throw new ApiError(401 , 'invalid request for logout')
    
    await BlackListedToken.create({
        token : accessToken
    }) 
    
    res.status(200).clearCookie('accessToken').json(
        new ApiResponse(200 , 'User logged Out Successfully')
    )
})
const checkAuth = asyncHandler(async(req : Request , res : Response)=>{
        console.log("reached user auth")
        return res.status(200).json(
            new ApiResponse(200 , 'authenticated ' , req.user)
        )
})
export {signup , signin , logout , checkAuth}