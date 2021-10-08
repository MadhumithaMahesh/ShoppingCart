const User = require('../models/user');
const braintree = require('braintree');
const { error } = require('console');
const { result } = require('lodash');
const { json } = require('body-parser');
require('dotenv').config();


const gateway = braintree.connect({
    // environment:braintree.Environment.Sandbox,
    // merchantId:process.env.BRAINTREE_MERCHANT_ID,
    // publicKey:process.env.BRAINTREE_PUBLIC_KEY,
    // privateKey:process.env.BRAINTREE_PRIVATE_KEY
    environment:  braintree.Environment.Sandbox,
    merchantId:   '3r88q9jtxbj5yhbn',
    publicKey:    'w97bw49jhr9tr9j8',
    privateKey:   '1cdcfe15d61ee9f6d8ce12a445090ebd'
})
exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
        // var clientToken = response.clientToken
      });

};

exports.paymentMethod = (req,res)=>{
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    // charge
    let newTransaction = gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        },
        (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
    return newTransaction
};