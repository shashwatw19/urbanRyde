import Router from 'express'
import { verifyJwt } from '../middleware/auth.midleware'
import {capturePayment , verifyPayment , sendRideSuccessMail} from "../controllers/payment.controller"
import {body} from "express-validator"
const router = Router()

router.route('/capture-payment').post([
    body('rideId').isString().withMessage('rideId is required'),
    body('fare').isNumeric().withMessage('fare is required')] , verifyJwt , capturePayment ) 
router.route('/verify-payment' ).post([
    body('razorpay_order_id').isString().withMessage('razorpay_order_id'),
    body('razorpay_payment_id').isString().withMessage('razorpay_payment_id'),
    body('razorpay_signature').isString().withMessage('razorpay_payment_id'),
    body('captainId').isString().withMessage('captain SocketId is required'),
    body('rideId').isString().withMessage('rideId is required')
] , verifyJwt , verifyPayment ) 
router.route('/ride-ended-mail' ).post([
    body('emailId').isString().withMessage('email id is required'),
    body('username').isString().withMessage('user name is required'),
    body('captain').isString().withMessage('captain name is required'),
    body('vehicleType').isString().withMessage('vehicle type is required'),
    body('fare').isNumeric().withMessage('fare is required'),
    body('distance').isNumeric().withMessage('distance is required'),
    body('duration').isNumeric().withMessage('duration is required'),
    body('pickup').isString().withMessage('pickup is required'),
    body('destination').isString().withMessage('destination is required')
] , verifyJwt , sendRideSuccessMail ) 

export default router


