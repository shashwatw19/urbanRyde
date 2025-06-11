import jwt, { JwtPayload } from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError'
import { asyncHandler } from '../utils/AsyncHandler'
import { Request , Response , NextFunction } from 'express';
import { BlackListedToken } from '../models/blackListedToken.model';
import dotenv from 'dotenv'
import { Captain } from '../models/captain.model';

dotenv.config()

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: unknown;
        email: string;
        fullname: {
          firstname: string;
          lastname: string;
        };
      };
    }
  }
}

const captainVerify = asyncHandler(async(req : Request, res : Response , next : NextFunction)=>{
    const accessToken = req.cookies?.accessToken
    
    if(!accessToken){
        throw new ApiError(401 , 'Unauthorized Request!')  
    }
    
    const isBlacklisted = await BlackListedToken.findOne({ token : accessToken });

    if (isBlacklisted) {
        throw new ApiError(401 , 'Token has been expired!') 
    }

    try{
        const secret = process.env.ACCESS_TOKEN_SECRET!
        const decodedToken = jwt.verify(accessToken , secret) as JwtPayload
        if (!decodedToken._id || !decodedToken.email) {
            throw new ApiError(401, 'Invalid token structure')
        }
        const validUser = await Captain.findById(decodedToken._id) 
        
        if(!validUser){
            throw new ApiError(404 , 'Captain not found for the token')
        }

        req.user = {
            _id : decodedToken._id,
            email : decodedToken.email,
            fullname : {
                firstname : decodedToken.fullname.firstname,
                lastname : decodedToken.fullname.lastname
            }
        }
        next()

    }catch(e){
        console.log("error in captain veriyJwt" , e)
        throw new ApiError(401, 'Invalid or expired captain token')  
    }
})

export {captainVerify}