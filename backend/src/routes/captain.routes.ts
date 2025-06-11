import Router from 'express'
import {body} from 'express-validator'
import {registerCaptain , loginCaptain , getCaptainProfile , logout , completeProfile , checkAuth} from '../controllers/captain.controller'
import { captainVerify } from '../middleware/captainAuth.middleware'
import { verifyJwt } from '../middleware/auth.midleware'
const router = Router()

router.route('/registerCaptain').post([
   body('email').trim().isEmail().withMessage('invalid email'),
    body('password').trim().isLength({min : 6}).withMessage('invalid password Length'),
    body('otp').notEmpty().isLength({max : 6}).withMessage('max Length of otp should be 6 digits'),
    // Fullname validation
    body('fullname.firstname').optional().trim().if((value) => value && value.length > 0).isLength({ min: 2 }).withMessage('Last name must be at least 2 characters if provided'),
    body('fullname.lastname').optional().trim().if((value) => value && value.length > 0).isLength({ min: 2 }).withMessage('Last name must be at least 2 characters if provided'),
    
    // Vehicle validation
    
] , registerCaptain )


router.route("/profile").post([
    body('color').trim().isLength({min: 3}).withMessage('Vehicle color must be at least 3 characters long'),
    body('NumberPlate').trim().isLength({min: 3}).withMessage('Number plate must be at least 3 characters long'),
    body('capacity').isInt({min: 1}).withMessage('Vehicle capacity must be at least 1'),
    body('vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be car, motorcycle, or auto'),
    
    // Location validation (optional fields)
   
] , verifyJwt ,  completeProfile)
router.route('/captainLogin').post([
    body('email').trim().isEmail().withMessage('Invalid email '),
    body('password').trim().isLength({min : 6}).withMessage('invalid password length')
] , loginCaptain )

router.route('/getCaptainDetails').get(captainVerify , getCaptainProfile)
router.route('/checkAuth').get(captainVerify , checkAuth)
router.route('/logoutCaptain').post(captainVerify , logout)

export default router
