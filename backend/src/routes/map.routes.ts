import Router from 'express'
import  { query} from "express-validator"
import { verifyJwt } from '../middleware/auth.midleware'
import { getCoordinates , getDistanceTimeForTrip , getSuggestions} from '../controllers/map.controller'
const router = Router()

router.get('/get-coordinates' , query('address').isString().isLength({min : 3}) , verifyJwt , getCoordinates)
router.get('/get-distance-time', 
    query('origin').isString().isLength({ min: 3 }), 
    query('destination').isString().isLength({ min: 3 }), 
    verifyJwt, 
    getDistanceTimeForTrip
)
router.get('/get-suggestions' , query('input').isString().isLength({min : 3}) , verifyJwt , getSuggestions)

export default router
