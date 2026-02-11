const express=require('express');
const router=express.Router();
const { getAllProducts , addProduct, updateProduct, deleteProduct } = require('../controllers/productcontroller');
const {protect}=require('../middlewares/authmiddleware');
const {allowrole}= require('../middlewares/rolemiddleware');

router.get('/',protect, getAllProducts );
router.post('/',protect,allowrole("owner"), addProduct);
router.put('/:productId',protect,allowrole("owner"), updateProduct);
router.delete('/:productId',protect,allowrole("owner"), deleteProduct);

module.exports=router;