import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const dbConnect = async()=>{
    try{
     
        const conenctionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`database connected to ${conenctionInstance?.connection.name} `)
    }catch(e){
        console.log("Error while connecting to Database" ,e)
    }
}

export {dbConnect}