import { Server } from "socket.io";
import { User } from "./models/user.model";
import type { Server as HTTPServer } from "http";
import { Captain } from "./models/captain.model";


type CaptianLocationType = {
    userId: string,
    location: {
        lat: number,
        lng: number
    }
}
let io: Server;
const initiateServer = (server: HTTPServer) => {
    io = new Server(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true
        }
    })

    io.on("connection", (socket) => {
        console.log("client connected", socket.id)

        socket.on('join', async (data) => {
            // console.log("data from join event" , data.userId , data.userRole , "socketId " , socket.id)
            const { userId, userRole } = data;
            if (userRole === 'user') {
                await User.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userRole === 'captain') {
                await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on('update-captain-location', async (data: CaptianLocationType) => {
            try {
                const { userId, location } = data;
                // console.log("data of location in update-captain-location" , data)
                await Captain.findByIdAndUpdate(userId, {
                    location: {
                        type: 'Point',
                        coordinates: [location.lng, location.lat] // [longitude, latitude]
                    }
                })
            } catch (error) {
                socket.emit('error', { message: 'An error occurred while updating captain location.', error: error instanceof Error ? error.message : error });
            }
        })
        
    })
}
const sendMessageToSocketId = (socketId: string, event: string, data: any) => {
    if (io) {
        const targetSocket = io.sockets.sockets.get(socketId)
      
        if(targetSocket && targetSocket.connected){
            console.log("socket is connected and sending message to " ,socketId)
             io.to(socketId).emit(`${event}`, data)
             console.log("socket message sent successfully")
        }
       
    } else {
        console.log("socket not connected")
    }
}
export { initiateServer, sendMessageToSocketId }