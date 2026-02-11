const express=require('express');
const router=express.Router();
const { createInvoice, getallInvoice, getInvoicebyId } = require('../controllers/invoiceController');
const {protect}=require('../middlewares/authmiddleware');
const {allowrole}= require('../middlewares/rolemiddleware');

router.post('/',protect,allowrole("owner","staff"), createInvoice);
router.get('/',protect,allowrole("owner","staff"), getallInvoice);
router.get('/:invoiceId',protect,allowrole("owner","staff"), getInvoicebyId);

module.exports=router;