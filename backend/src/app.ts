import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors' 
const app = express();


app.use(cors({
    origin : "*",
    credentials : true
    
}))
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.get('/api/v1' , (req,res)=>{
    res.send(`<h1>Hello Mf!!</h1>`)
})

// import routes starts from here
import otpRoute from '../src/routes/otp.routes'
import userRoutes from '../src/routes/user.routes'
import captainRoutes from '../src/routes/captain.routes'

app.use('/api/v1/otp' , otpRoute)
app.use('/api/v1/user' , userRoutes)
app.use('/api/v1/captain' , captainRoutes)

export {app}