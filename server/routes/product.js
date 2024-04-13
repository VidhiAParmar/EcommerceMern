const express = require('express')
const router = express.Router();
const Product = require('../modals/ProductSchema');

router.get('/test',(req,res)=>{
    res.json({message: "product api is working"})
})

router.post('/createProduct',async(req,res)=>{
    try {
        await Product.create(req.body)
        .then(product => res.json({
            ok: true,
            data: product,
            message: 'product created successfully'
        }))
    }catch (error) {
        console.log(error)
       }
    
})

router.get('/products',async(req,res)=>{
   try {
    const product = await Product.find()
    res.status(200).json({
        ok: true,
        data: product,
        message: 'Product retrieved successfully'
    })
   } catch (error) {
    console.log(error)
   }
})

router.get('/getProduct/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const product =await Product.findById({_id:id})
        res.status(200).json({
            ok: true,
            data: product,
            message: 'Product retrieved using id'
        })
    }catch (error) {
        console.log(error)
       }
    
})

router.put('/updateProduct/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const product =await Product.findByIdAndUpdate({_id:id},{
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            imageUrl: req.body.imageUrl
        })
        res.status(200).json({
            ok: true,
            data: product,
            message: 'Product  updated'
        })
    }catch (error) {
        console.log(error)
       }
    
})

router.delete('/deleteproduct/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        Product.findByIdAndDelete({_id:id})
        .then(product => res.json({
            ok: true,
            data: product,
            message: 'Product deleted successfully'
        }))
    }catch (error) {
        console.log(error)
       }
    
})

module.exports = router;