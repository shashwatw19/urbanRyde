import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Model } from 'mongoose'

interface IUser extends Document {
    fullname : {
        firstname : string,
        lastname : string
    },
    email : string,
    password : string | undefined,
    socketId : string | null,
    generateAccessToken : ()=>string,
    matchPassword : (password : string)=>Promise<boolean>

}


const userSchema = new mongoose.Schema<IUser>({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [3 , "Fisrt name must be at least 3 characters long"]
        },
        lastname : {
            type : String,
            default : ""
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        
    },
    socketId : {
        type : String
    }
}) 

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    else{
        if(this.password){
            this.password = await bcrypt.hash(this.password, 10)
        }
    }
    
    next()
})

userSchema.methods.generateAccessToken = function(){
    const payload : 
    {
        _id : unknown ,
        email : string , 
        fullname : {
            firstname : string,
            lastname : string
        }} 
    = {
        _id : this._id,
        email : this.email,
        fullname : {
            firstname : this.fullname.firstname,
            lastname : this.fullname.lastname
        }
    }
    const secret = process.env.ACCESS_TOKEN_SECRET!

    return jwt.sign(payload , secret , {expiresIn : "1d"  })
}



userSchema.methods.matchPassword = async function(password: string){
    if (!this.password || !password) {
        return false;
    }
    return await bcrypt.compare(password, this.password);
}

export const User : Model<IUser> = mongoose.model<IUser>("User" , userSchema)
