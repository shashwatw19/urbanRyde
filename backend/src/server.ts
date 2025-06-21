import { app } from './app'
import { createServer } from 'http'
import { initiateServer } from './socket'
import dotenv from 'dotenv'
import './index'
dotenv.config()

const PORT = process.env.PORT || 8000
const server = createServer(app)
initiateServer(server)

server.listen(PORT , ()=>{
    console.log("socket is running on the port" ,PORT)
}).on('error' , (err)=>{
    console.log('server falied to start' , err)
})