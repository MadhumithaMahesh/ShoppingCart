const express = require('express')
const router = express.Router()

 const {userSignUpValidator} = require('../validator/index')
 const{signup,signin,signout,requireSignIn} = require('../controllers/auth')
router.post('/signup',signup)
 router.post('/signin',signin)
 router.get('/signout',signout)
// router.get('/hello',requireSignIn,(req,res)=>
// {
//     res.send('hello there')
// })
module.exports = router