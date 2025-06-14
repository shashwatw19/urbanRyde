import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Document } from 'mongoose'
import jwt from 'jsonwebtoken'
dotenv.config()

interface ICaptain extends Document {
    fullname : {
        firstname : string,
        lastname : string
    }
    email : string,
    password : string | undefined,
    socketId : string,
  
    status : 'active' | 'inactive' ,
    vehicle : {
        color : {
            type : string
        },
        NumberPlate : {
            type : string
        },
        capacity : {
            type : number
        },
        vehicleType : 'car' | 'moto' | 'auto'
    },
    location : {
        ltd : {
            type : number
        },
        lng : {
            type : number
        },

    },

    generateAccessToken  : ()=> Promise<string>,
    comparePassword : (password : string)=>Promise<boolean>

}
const captainSchema = new mongoose.Schema<ICaptain>({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            
            default : ""
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            
            minlength: [3, 'Color must be at least 3 characters long']
        },
        NumberPlate: {
            type: String,
            
            minlength: [3, 'Number plate must be at least 3 characters long']
        },
        capacity: {
            type: Number,
            
            min: [1, 'Capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            
            enum: ['car', 'moto', 'auto']
        }
    },
    location: {
        ltd: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
}, {
    timestamps: true
})

captainSchema.methods.generateAccessToken = function(): string {
    const payload : {_id : string , email : string , fullname : {firstname : string , lastname : string}} = 
    {
        _id : this._id,
        email : this._id,
        fullname : {
            firstname : this.fullname.firstname,
            lastname  : this.fullname.lastname
        }
    }
    const sercret = process.env.ACCESS_TOKEN_SECRET! as jwt.Secret 
    
    return jwt.sign(payload ,sercret , {expiresIn : '1d'} )
}

captainSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    if(!this.password || !password) {
            return false;
    }
    return await bcrypt.compare(password, this.password);
}

captainSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    
   if(this.password){
     this.password = await bcrypt.hash(this.password, 10)
    next()
   }
})

export const Captain = mongoose.model<ICaptain>('Captain', captainSchema)