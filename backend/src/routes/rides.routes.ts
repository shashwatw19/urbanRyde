import Router from 'express'
import {body} from 'express-validator'
import { verifyJwt } from '../middleware/auth.midleware'
import {createRide , getFareForTrip} from '../controllers/ride.controller'
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
    body('pickup').isString().isLength({ min: 3 }).withMessage('invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('invalid pickup length')
] , verifyJwt , getFareForTrip)



export default router