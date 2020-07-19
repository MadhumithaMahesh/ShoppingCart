const mongoose = require('mongoose')
const crypto = require('crypto')
// const uuidv1 = require('uuid/v1')
bcrypt = require('bcrypt')
    SALT_WORK_FACTOR = 10;


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    about:{
        type:String,
        trim:true
    },
    salt:{
        type:String
    },
    role:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
    }
},{timestamps:true})
// userSchema.pre('save', function(next) {
//     var user = this;

//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();

//     // generate a salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//         if (err) return next(err);

//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);

//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });
userSchema.methods.authenticate=function(password)
{
if(password==this.password)
return true
else return false
      
}


module.exports = mongoose.model('Users',userSchema)