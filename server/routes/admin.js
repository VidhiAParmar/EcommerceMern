const express = require('express')
const router = express.Router();
const Admin = require('../modals/AdminSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminTokenHandler = require('../middlewares/checkAdminToken');

function createResponse(ok, message, data){
    return{
        ok,
        message,
        data,
    };
}

router.get('/test',(req,res)=>{
    res.json({message: "admin api is working"})
})

router.post('/register', async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin){
            return res.status(409).json(createResponse(false,'Admin with this email already exists'));
        }

        const newAdmin = new Admin({
            name,
            email,
            password
        })
        await newAdmin.save();
        res.status(201).json(createResponse(true,'Admin registered successfully'));
    } catch (error) {
        console.log(error)
    }
})

router.post('/login', async (req,res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json(createResponse(false, 'Invalid admin credentials'));
        }
        const adminAuthToken = jwt.sign({adminId: admin._id},process.env.JWT_ADMIN_SECRET_KEY,{expiresIn: '10m'});
        res.cookie('adminAuthToken',adminAuthToken);
        res.status(200).json(createResponse(true, 'Login successful', {
            adminAuthToken,
            admin
        }));
    } catch (error) {
        console.log(error)
    }
})

router.get('/admins', async (req,res,next) => {
    try {
        const admin = await Admin.find();

        // Return the list of admin as JSON response
        res.status(200).json({
            ok: true,
            data: admin,
            message: 'admin retrieved successfully'
        });
    }
    catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
})

router.get('/checklogin', adminTokenHandler ,async (req, res) => {
    res.json({
        adminId: req.adminId,
        ok: true,
        message: 'Admin authenticated successfully'
    })
})
router.post('/logout', (req, res) => {
    // Clear the token from client-side (e.g., remove cookie or clear local storage)
    res.clearCookie('adminAuthToken'); // For example, if you stored the token in a cookie

    // Send a success response
    res.status(200).json({
        ok: true,
        message: 'Admin logged out successfully'
    });
});




module.exports = router;