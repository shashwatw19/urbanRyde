import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors' 
import dotenv from "dotenv"
dotenv.config()

const app = express();


app.use(cors({
    origin : process.env.ORIGIN,
    credentials : true
}))

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/' , (req,res)=>{
    res.send('this is urbanryde server!')
})

// import routes starts from here
import otpRoute from './routes/otp.routes'
import userRoutes from './routes/user.routes'
import captainRoutes from './routes/captain.routes'
import mapRoutes from "./routes/map.routes"
import rideRoutes from "./routes/rides.routes"
import paymentRoutes from "./routes/payment.routes"
app.use('/api/v1/otp' , otpRoute)
app.use('/api/v1/user' , userRoutes)
app.use('/api/v1/captain' , captainRoutes)
app.use('/api/v1/map' ,mapRoutes)
app.use('/api/v1/ride' , rideRoutes)
app.use("/api/v1/payment" , paymentRoutes)
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