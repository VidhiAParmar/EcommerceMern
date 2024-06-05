const express = require('express');
const router = express.Router();
const User = require('../modals/UserSchema');
const authTokenHandler = require('../middlewares/checkAuthToken');
const errorHandler = require('../middlewares/errorMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



router.get('/test', async (req, res) => {
    res.json({
        message: "Auth api is working"
    })
})



function createResponse(ok, message, data) {
    return {
        ok,
        message,
        data,
    };
}

router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json(createResponse(false, 'Email already exists'));
        }
        const newUser = new User({
            name,
            password,
            email,
        });

        await newUser.save(); // Await the save operation
        res.status(201).json(createResponse(true, 'User registered successfully'));

    }
    catch (err) {
        next(err)
    }
})


router.post('/login', async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        console.log('user not found');
        return res.status(400).json(createResponse(false, 'Invalid credentials'));
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //     console.log('password not matched');
    //     return res.status(400).json(createResponse(false, 'Invalid credentials'));
    // }

    const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '30m' });
    res.cookie('authToken', authToken,  { httpOnly: true, secure: true, sameSite: 'None' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'None' });
    let id = user._id
    res.status(200).json(createResponse(true, 'Login successful', {
        authToken,
        refreshToken,
        id
    }));
})

router.get('/checklogin', authTokenHandler, async (req, res) => {
    res.json({
        userId: req.userId,
        ok: true,
        message: 'User authenticated successfully'
    })
})
router.get('/users', async (req,res,next) => {
    try {
        const user = await User.find();

        // Return the list of user as JSON response
        res.status(200).json({
            ok: true,
            data: user,
            message: 'user retrieved successfully'
        });
    }
    catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
})

router.get('/logout', async (req, res) => {
    res.clearCookie('authToken');
    res.clearCookie('refreshToken');
    res.json({
        ok: true,
        message: 'User logged out successfully'
    })
})

router.get('/getuser', authTokenHandler, async (req, res) => {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
        return res.status(400).json(createResponse(false, 'Invalid credentials'));
    }
    else{
        return res.status(200).json(createResponse(true, 'User found', user));
    }
})

router.use(errorHandler)

module.exports = router;