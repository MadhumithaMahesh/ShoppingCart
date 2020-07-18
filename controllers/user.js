const User = require('../models/user')
const { Order } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.userById = (req,res,next,id)=>
{
    User.findById(id).exec((err,user)=>
    {
        if(err||!user)
        return res.status(400).json({
            error:'User not found'
        })
        req.profile = user
        next()
    })
}

exports.read = (req,res)=>
{
    return res.json(req.profile)
}
exports.update = (req,res)=>
{
    User.findByIdAndUpdate({_id:req.profile._id},{$set:req.body},{new:true},(err,user)=>
    {
        if(err)
        return res.status(400).json({
            error:'You cannot access the profile'
        })
        res.json(user)
    })
}

exports.addOrderToUserHistory= (req,res,next)=>
{
    let history = []
    req.body.order.products.forEach((item)=>
    {    
    
        history.push({
            _id:item.id,
            description:item.description,
            category:item.category,
            quantity:item.count,
            name:item.name,
            amount:req.body.order.amount,
            transactionId:req.body.order.transactionId

        })     

        })

        User.findByIdAndUpdate({_id:req.profile._id},{$push:{history:history}},
            {new:true},(error,data)=>
            {
                if(error)
                {
                    return res.status(400).json({
                        error:'Could not upload History'
                    })
                }
                next()
            })
}

exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};

