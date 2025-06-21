import { dbConnect } from "./config/db";
import { app } from "./app";
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000

dbConnect()
// then(()=>{
//     app.listen(PORT , ()=>{
//         console.log(`server is running on the http://localhost:${PORT}`)
//     })
// })

