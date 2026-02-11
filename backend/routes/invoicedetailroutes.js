const express=require('express');
const router=express.Router();
const { shopname,customername,ownername } = require('../controllers/invoicedetailController');
const {protect}=require('../middlewares/authmiddleware');

router.get('/shop',protect, shopname)
router.get('/customer/:id',protect, customername)
router.get('/owner',protect, ownername)

module.exports=router;