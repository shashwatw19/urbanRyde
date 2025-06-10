import Router from 'express'
import {body} from 'express-validator'
import { signup , signin, logout , checkAuth} from '../controllers/user.controller'
import { verifyJwt } from '../middleware/auth.midleware'

const router = Router()
router.route('/signup').post([
    body('otp').isLength({min : 6 , max : 6}  ).withMessage('otp is required'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').trim().isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').optional().trim().if((value) => value && value.length > 0).isLength({ min: 2 }).withMessage('Last name must be at least 2 characters if provided'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
] , signup)

router.route('/signin').post([
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').trim().isLength({ min: 6 }).withMessage('password should not be empty'),

] , signin)

router.route('/checkAuth').get(verifyJwt , checkAuth)

router.route('/logout').post(verifyJwt , logout)

export default router

