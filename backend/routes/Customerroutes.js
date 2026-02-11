const express=  require('express');
const router=express.Router();
const {addCustomer,getallcustomer,getcustomerpurchasehistory}=require('../controllers/CustomerController');
const {protect}= require('../middlewares/authmiddleware');
const {allowrole}= require('../middlewares/rolemiddleware');

router.post('/',protect,allowrole("owner"),addCustomer);
router.get('/',protect,allowrole("owner"),getallcustomer);
router.get('/:id/',protect,allowrole("owner"),getcustomerpurchasehistory);

module.exports=router;