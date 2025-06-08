import jwt, { JwtHeader, JwtPayload } from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError'
import { asyncHandler } from '../utils/AsyncHandler'
import { Request , Response , NextFunction } from 'express';
import { BlackListedToken } from '../models/blackListedToken.model';
import dotenv from 'dotenv'
import { User } from '../models/user.model';
dotenv.config()
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: unknown;
        email: string;
        firstname : string
    };
    }
  }
}

const verifyJwt = asyncHandler(async(req : Request, res : Response , next : NextFunction)=>{
    const accessToken = req.cookies?.accessToken
    if(!accessToken){
        throw new ApiError(402 , 'Unauthorised Request!')
    }
    const isBlacklisted = await BlackListedToken.findOne({ token : accessToken });

    if (isBlacklisted) {
        return new ApiError(403 , 'Token has been expired!')
    }

    try{
        const sercret = process.env.ACCESS_TOKEN_SECRET! 
        const decodedToken  = jwt.verify(accessToken , sercret) as JwtPayload
        const validUser = await User.findById({_id : decodedToken._id})
        
        if(!validUser){
            throw new ApiError(404 , 'user not found for the token')
        }

        req.user = {
            _id : decodedToken._id,
            email : decodedToken.email,
            firstname : decodedToken.firstname
        }
        next()

    }catch(e){
        console.log("error in verifyJwt" , e)
    }
})

export {verifyJwt}