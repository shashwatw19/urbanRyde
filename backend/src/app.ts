import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors' 
const app = express();


app.use(cors({
    origin : ['http://localhost:5173','https://530pz896-5173.inc1.devtunnels.ms'],
    credentials : true
}))

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())



// import routes starts from here
import otpRoute from '../src/routes/otp.routes'
import userRoutes from '../src/routes/user.routes'
import captainRoutes from '../src/routes/captain.routes'
import mapRoutes from "../src/routes/map.routes"
import rideRoutes from "../src/routes/rides.routes"
app.use('/api/v1/otp' , otpRoute)
app.use('/api/v1/user' , userRoutes)
app.use('/api/v1/captain' , captainRoutes)
app.use('/api/v1/map' ,mapRoutes)
app.use('/api/v1/ride' , rideRoutes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    
     res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        statusCode : statusCode
    });
});
export {app}