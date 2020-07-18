const expressValidator = require('express-validator')

exports.userSignUpValidator = (req,res,next)=>
{
    req.check('name','Name is required').notEmpty()
    req.check('email','Email must be between 3 to 32')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({
        min:4,
        max:32
    })
    req.check('password','password is required').notEmpty()
    req.check('password')
    .isLength({
        min:4,
        max:32
    })
    .withMessage('Password must contain atleast 4 characters')
    .matches(/\d/)
    .withMessage('Password should contain a number')
    const error = req.validationErrors()
    if(error)
    {
        const firstError = error.map(error=>error.msg)[0]
        return res.status(400).json({
            error:firstError
        })
    }
    next()
}
