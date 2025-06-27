import mongoose from 'mongoose'
import {  Document} from 'mongoose'
import { mailSender } from '../config/mailSender';
import { emailVerificationTemplate } from '../mail/templates/emailVerificationTemplate';

export interface IOtp extends Document {
    email : string,
    otp : number,
    createdAt : Date;
    expiresAt : Date
}

const otpSchema = new mongoose.Schema<IOtp>({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default: Date.now() + 5 * 60 * 1000 // 5 minutes from creation
    }
})

const sendVerificationMail = async(email : string , otp : string) : Promise<void>=>{
    try{
        const mailResponse = await mailSender(email , 'Verification Mail' , otp);
        console.log('verification mail sent successfully');

    }catch(err){
        console.log('error while sending verification mail')
    }
}

otpSchema.pre('save' , async function (next){
    if(this.isNew){
        console.log(this.otp)
        await sendVerificationMail(this.email ,  emailVerificationTemplate(this.otp) )
    }

    next();
})
export const Otp = mongoose.model<IOtp>("Otp" , otpSchema)


