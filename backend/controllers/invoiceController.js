const InvoiceModel = require("../models/InvoiceModel");
const Product = require("../models/ProductModel");

const createInvoice=async(req,res)=>{
    try{
        const {items, customerId}=req.body;
        console.log("Received invoice data:", {items, customerId});
        const shopId=req.user.shopId;
        const createdBy=req.user.userId;

        if(!items || items.length===0){
            return res.status(400).json({message:'Invoice must have at least one item'});
        }

        let invoiceitems=[];
        let subtotal=0;

        for(let item of items){
            const product=await Product.findById(item.productId);

            if(!product){
                return res.status(404).json({message:`Product with ID ${item.productId} not found`});
            }

            if(product.shopId.toString()!==shopId){
                return res.status(403).json({message:`Unauthorized to access product with ID ${item.productId}`});
            }

            if(item.quantity>product.quantity){
                return res.status(400).json({message:`Insufficient stock for product ${product.name}`});
            }

            const lineTotal=product.price * item.quantity;
            subtotal+=lineTotal;

            invoiceitems.push({
                productId:product._id,
                productname:product.name,
                priceatthattime:product.price,
                quantity:item.quantity,
                lineTotal,
            });
        }

        const gstamount=subtotal * 0.18;
        const total=subtotal + gstamount;

        const invoicenumber=`INV-${Date.now()}`;

        const invoice= await InvoiceModel.create({
            invoicenumber,
            shopId,
            createdBy,
            customerId,
            items:invoiceitems,
            subtotal,
            gst:gstamount,
            total,

        })

        for(let item of items){
            const product=await Product.findById(item.productId);
            product.quantity-=item.quantity;
            await product.save();
        }

        res.status(201).json({message:'Invoice created successfully', invoice});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('invoice controller Error');
    }
}

const getallInvoice=async(req,res)=>{
    try{
        const shopId=req.user.shopId;
        const invoices= await InvoiceModel.find({shopId}).sort({createdAt:-1});
        res.status(200).json({invoices});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const getInvoicebyId=async(req,res)=>{
    try{
        const {invoiceId}=req.params;
        console.log("Fetching invoice with ID:", invoiceId);
        const shopId=req.user.shopId;
        const invoice=await InvoiceModel.findOne({
            _id:invoiceId,
            shopId,
        })
        if(!invoice){
            return res.status(404).json({message:'Invoice not found'});
        }
        res.status(200).json({invoice});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports={createInvoice,getallInvoice,getInvoicebyId};