const express = require('express')
const router = express.Router()
const{requireSignIn,isAuth,isAdmin} = require('../controllers/auth')
const {userById,addOrderToUserHistory} = require('../controllers/user')
const {create,listOrders,getStatusValues,updateStatusValues,orderById} = require('../controllers/order')
const {decreaseQuantity} = require('../controllers/product')

router.post('/order/create/:userId',requireSignIn,isAuth,addOrderToUserHistory,decreaseQuantity,create)
router.get('/orders/list/:userId',requireSignIn,isAuth,isAdmin,listOrders)
router.get('/orders/statusValues/:userId',requireSignIn,isAuth,isAdmin,getStatusValues)
router.put('/orders/:orderId/updateStatus/:userId',requireSignIn,isAuth,isAdmin,updateStatusValues)

router.param('userId',userById)
router.param('orderId',orderById)

module.exports = router