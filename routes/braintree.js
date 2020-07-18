const express = require('express')
const router = express.Router()
const{requireSignIn,isAuth} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {generateToken,paymentMethod} = require('../controllers/braintree')

router.get('/braintree/getTokens/:userId',requireSignIn,isAuth,generateToken)
router.post('/braintree/payment/:userId',requireSignIn,isAuth,paymentMethod)
router.param('userId',userById)

module.exports = router