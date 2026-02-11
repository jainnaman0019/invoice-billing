const Customer=require("../models/CustomerModel");
const InvoiceModel = require("../models/InvoiceModel");

const addCustomer=async(req,res)=>{
    try{
        const {name,phone,email}=req.body;
        console.log("Received customer data:", {name, phone, email});
        const shopid=req.user.shopId;
        
        if(!name || !phone){
            return res.status(400).json({message:"Name and phone are required"});
        }
        const customer= await Customer.create({
            name,
            phone,
            email,
            shopId:shopid,
        });
        res.status(201).json({message:"Customer added successfully",customer});
    }
    catch(error){
        console.error("Error adding customer:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

const getallcustomer=async(req,res)=>{
    try{
        const shopId=req.user.shopId;
        const customers=await Customer.find({shopId}).sort({createdAt:-1});
        res.status(200).json({customers});
    }
    catch(error){
        console.error("Error fetching customers:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

const getcustomerpurchasehistory=async(req,res)=>{
    try{
        const shopId=req.user.shopId;
        const customerId=req.params.id;

        const customer=await Customer.findOne({
            _id:customerId,
            shopId,
        });

        if(!customer){
            return res.status(404).json({message:"Customer not found"});
        }

        const history=await InvoiceModel.find({
            shopId,
            customerId,
        }).sort({createdAt:-1});

        res.status(200).json({customer,history});
    }
    catch(error){
        console.error("Error fetching customer purchase history:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports={addCustomer,getallcustomer,getcustomerpurchasehistory}