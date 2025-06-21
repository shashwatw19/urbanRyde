import Router from 'express'
import {body , query} from 'express-validator'
import { verifyJwt } from '../middleware/auth.midleware'
import {createRide , getFareForTrip , confirmRide , startRide , isValidRideUser , isValidRideCaptain} from '../controllers/ride.controller'
import { captainVerify } from '../middleware/captainAuth.middleware'
const router = Router()

router.route('/create').post([
   
    body('pickup').isString().isLength({ min: 3 }).withMessage('invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('invalid pickup length'),
    body('vehicleType')
        .isString()
        .isIn(['car', 'auto', 'moto'])
        .withMessage('vehicleType must be one of: car, auto, bike')
] , verifyJwt , createRide)

router.route('/get-fare').get([
    query('pickup').isString().isLength({ min: 3 }).withMessage('invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('invalid pickup length')
], verifyJwt, getFareForTrip)

router.route('/confirm-ride').post([
    body('rideId').isString().withMessage('rideId is required'),
],captainVerify , confirmRide)

router.route('/start-ride').post([
    body('rideId').isString().withMessage('rideId is required and must be a string'),
    body('otp').isString().isLength({ min: 6, max: 6 }).withMessage('otp is required and must be 6 characters long'),
    body('userSocketId').isString().withMessage('userSocketId is required and must be a string')
], captainVerify, startRide)

router.route('/verify/user').post([
    body('rideId').isString().withMessage('rideId is required and must be a string')
] , verifyJwt , isValidRideUser)

router.route('/verify/captain').post([
    body('rideId').isString().withMessage('rideId is required and must be a string')
] , captainVerify , isValidRideCaptain)
export default router