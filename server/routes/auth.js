const express = require('express')
const router = express.Router();
const User = require('../modals/UserSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authTokenHandler = require('../middlewares/checkAuthToken'); 
require('dotenv').config();
function createResponse(ok, message, data){
    return{
        ok,
        message,
        data,
    };
}

router.get('/test',(req,res)=>{
    res.json({message: "auth api is working"})
})

router.post('/register', async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json(createResponse(false,'User with this email already exists'));
        }

        const newUser = new User({
            name,
            email,
            password
        })
        await newUser.save();
        res.status(201).json(createResponse(true,'User registered successfully'));
    } catch (error) {
        console.log(error)
    }
})

router.post('/login', async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json(createResponse(false, 'Invalid User credentials'));
        }
        const authToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '30m' });
        res.cookie('authToken', authToken);
        res.cookie('refreshToken', refreshToken);
        
        res.status(200).json(createResponse(true, 'Login successful', {
            authToken,
            refreshToken,
            user
        }));
    } catch (error) {
        // Handle error
    }
})


router.get('/users', async (req,res,next) => {
    try {
        const user = await User.find();

        // Return the list of User as JSON response
        res.status(200).json({
            ok: true,
            data: user,
            message: 'User retrieved successfully'
        });
    }
    catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
})

router.get('/checklogin',authTokenHandler, async (req, res) => {
    try {
        console.log(req.cookies);
        console.log("user id is"+req.userId)
        res.json({
        userId: req.userId,
        ok: true,
        message: 'User authenticated successfully'
    })
    } catch (error) {
        console.log(error)
    }
})
router.get('/logout', authTokenHandler, async (req, res) => {
    res.clearCookie('authToken');
    res.clearCookie('refreshToken');
    res.json({
        ok: true,
        message: 'User logged out successfully'
    })
})



module.exports = router;