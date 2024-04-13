const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser  = require('cookie-parser')
app.use(express.json());
app.use(cookieParser());
app.use(cors());
require('./db')

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const cart = require('./routes/cart')

app.use('/auth',authRoutes);
app.use('/admin',adminRoutes);
app.use('/product',productRoutes);
app.use('/cart',cart);


app.get('/',(req,res)=>{
    res.json({message:" the api is working"})
})

app.listen(process.env.PORT,() => {
    console.log(`server rinnung on port number ${process.env.PORT}`)
});