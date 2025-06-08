import Router from 'express'
import {body} from 'express-validator'
import { createOtp } from '../controllers/otp.controller'
const router = Router()

router.route('/create').post(body('email').trim().isEmail() ,  createOtp)

export default router