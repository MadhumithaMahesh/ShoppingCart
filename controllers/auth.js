const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
bcrypt = require('bcrypt')
require('dotenv').config()
const {errorHandler} = require('../helpers/dbErrorHandler')
exports.signup = (req,res)=>{
    console.log(req.body)
    const user = new User(req.body)
    user.save((error,user)=>
    {
        if(error)
        {
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.send(user)
    })
}
exports.signin = (req,res)=>{
    const{email,password} = req.body
    console.log(email,password)
    User.findOne({email},(err,user)=>
    {
        if(err||!user)
        {
            return res.status(400).json({
                error:'User with this email not found'
            })
        }
        if(user.authenticate(password)==false)
        {
            return res.status(401).json({
                error:'Email and password dont match'
            })
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
        res.cookie('t',token,{expire:new Date()+9999})
        const{_id,name,email,role} = user
        return res.json({token,user:{_id,name,email,email,role}})
        console.log(token)
    })
}
//     // exports.signout = (req,res)=>{
//     //     res.clearCookie('t')
//     //     res.json({message:'Signed out'})
//     // }
    
// }
exports.signout = (req,res)=>{
    res.clearCookie('t')
    res.json({message:'signed out success'})
}

exports.requireSignIn = expressJwt({
    secret:process.env.JWT_SECRET,
    userProperty:'auth'


})
exports.isAuth = (req,res,next)=>
{
    let user = req.profile && req.auth && req.profile._id ==req.auth._id
    
    if(!user)
    {
        return res.status(403).json({
            error:'Access Denied'
        })
    }
    next()
}

exports.isAdmin = (req,res,next)=>
{
    if(req.profile.role===0)
    {
        return res.status(403).json({
            error:'Admin Resource Access denied'
        })
    }
    next()
}

