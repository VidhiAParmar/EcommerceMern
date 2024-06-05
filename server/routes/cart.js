const express = require('express');
const router = express.Router();
const User = require('../modals/UserSchema');
const Product = require('../modals/ProductSchema')

router.get('/test',(req,res)=>{
    res.json('cart api is working');
})

router.post('/addtocart', async (req,res)=> {
    const {userId, productId} = req.body;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        user.cart.push(productId);
        await user.save();
        res.status(200).json({message: 'Item addded to cart'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server error'})
    }
})

router.delete('/deletefromcart/:uid/:pid',async (req,res)=>{
    try {
        const {uid,pid} = req.body;
        
        const user = await User.findById({_id:uid});
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        user.cart = user.cart.filter(item => item.toString() !== pid);
        await user.save();
        res.status(200).json({ message: 'Item deleted from cart' });
    } catch (error) {
        console.log(error)
        res.json({message: "error to delete"})
    }
})
router.get('/getcartitem/:id', async (req, res) => {
    try {
        const userId = req.params.id; 
        const user = await User.findById(userId); // Correct usage of findById
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const cartItem = user.cart;
        res.status(200).json({
            ok: true,
            data: cartItem,
            message: 'Cart item retrieved successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message }); // Return specific error message
    }
});



module.exports = router;