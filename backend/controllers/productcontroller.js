const Shop = require("../models/ShopModel");
const Product = require("../models/ProductModel");

const addProduct= async(req,res)=>{
    try{
        const {name, price,quantity,category}=req.body;
        console.log("Received product data:", { name, price, quantity, category });
        const product= await Product.create({
            name,
            price,
            quantity,
            category,
            shopId:req.user.shopId
        })

        res.status(201).json({message:'Product added successfully', product});

    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const getAllProducts=async(req,res)=>{
    try{
        const products=await Product.find({shopId:req.user.shopId});
        res.status(200).json({products});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const updateProduct=async(req,res)=>{
    try{
        const {name,price,quantity,category}=req.body;
        const { productId } = req.params; 
        
        const product=await Product.findOne({
            _id:productId,
            shopId:req.user.shopId
           });

        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        Object.assign(product,{name,price,quantity,category});
        await product.save();

        res.status(200).json({message:'Product updated successfully', product});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const deleteProduct=async(req,res)=>{
    try{
        const { productId } = req.params; 

        const product=await Product.findOneAndDelete({
            _id:productId,
            shopId:req.user.shopId
        });

        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        res.status(200).json({message:'Product deleted successfully'});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports={addProduct,getAllProducts,updateProduct,deleteProduct};