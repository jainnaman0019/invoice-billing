const Shop = require('../models/ShopModel');
const Customer = require('../models/CustomerModel');
const Users = require('../models/UserModel');

const shopname = async (req, res) => {
  try {
    const shopId = req.user.shopId;

    const shop = await Shop.findById(shopId); // FIXED

    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.status(200).json({ shopName: shop.shopName });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const ownername=async(req,res)=>{
    try{
        const shopid=req.user.shopId;
        const shop=await Shop.findById(shopid);
        if(!shop){
            return res.status(404).json({message:'Shop not found'});
        }
        const owner=await Users.findById(shop.ownerId);
        if(!owner){
            return res.status(404).json({message:'Owner not found'});
        }
        res.status(200).json({ownerName:owner.name});
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

const customername = async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      res.status(200).json({ customerName: customer.name });
  
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

module.exports = {
    shopname,
    customername,
    ownername
};
