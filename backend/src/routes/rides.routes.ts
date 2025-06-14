import Router from 'express'
import {body} from 'express-validator'
import { verifyJwt } from '../middleware/auth.midleware'
import {createRide} from '../controllers/ride.controller'
const router = Router()
router.route('/create').post([
    body('userId').isString().isLength({ min: 24, max: 24 }).withMessage('invalid user id'),
    body('pickup').isString().isLength({ min: 3 }).withMessage('invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('invalid pickup length'),
    body('vehicleType')
        .isString()
        .isIn(['car', 'auto', 'moto'])
        .withMessage('vehicleType must be one of: car, auto, bike')
] , verifyJwt , createRide)

export default router