import mongoose from 'mongoose'
import { Document } from 'mongoose'

interface IRide extends Document {
    user: mongoose.Types.ObjectId | null
    captain: mongoose.Types.ObjectId | null
    pickup: string
    destination: string
    fare: number
    status: 'pending' | 'accepted' | 'ongoing' | 'completed' | 'cancelled'
    duration: number
    distance: number
    paymentId: string
    orderId: string
    signature: string
    otp: string | undefined
}

const RideSchema = new mongoose.Schema<IRide>({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    captain: { type: mongoose.Types.ObjectId, ref: 'Captain', },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    fare: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'], 
        default: 'pending',
        required: true
    },
    duration: { type: Number, },
    distance: { type: Number,  },
    paymentId: { type: String},
    orderId: { type: String },
    signature: { type: String},
    otp: { type: String, required: true }
}, { timestamps: true })

const Ride = mongoose.model<IRide>('Ride', RideSchema)

export { IRide, Ride }