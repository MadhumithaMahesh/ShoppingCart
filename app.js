const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')
require('dotenv').config()
const app = express()
mongoose.connect('mongodb://127.0.0.1:27017',{useNewUrlParser:true,useCreateIndex:true}).then(()=>
{
    console.log('connected to DB')
})
mongoose.connection.on('error',err=>
{
    console.log('Couldnt conect to DB')
})

const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const braintreeRoutes = require('./routes/braintree')
const orderRoutes = require('./routes/order')
 const authRoutes = require('./routes/auth')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(expressValidator())
app.use(cors())


 app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',braintreeRoutes)
app.use('/api',orderRoutes)
 app.use('/api',authRoutes)
// app.get('/',(req,res)=>
// {
//     res.send('hello node')
// })
const port = process.env.PORT||8000
app.listen(port,()=>
{
    console.log('server is up')
})