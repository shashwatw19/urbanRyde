import mongoose from 'mongoose'
import { Document } from 'mongoose'
import { Model } from 'mongoose'

interface IToken extends Document{
    token : string,
    createdAt : Date
}


const blackListedTokenSchema = new mongoose.Schema<IToken>({
    token : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 86400 //miliseconds 
    }
})

export const BlackListedToken : Model<IToken> = mongoose.model<IToken>("BlackListedToken" , blackListedTokenSchema)