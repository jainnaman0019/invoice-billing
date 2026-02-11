const express = require('express');
const router = express.Router();
const {
  TodaySales,
  monthlysales,
  getlastsevendays,
  getusername
} = require('../controllers/reportsController');
const { protect } = require('../middlewares/authmiddleware');

router.get('/today', protect, TodaySales);
router.get('/monthly', protect, monthlysales);
router.get('/last-seven-days', protect, getlastsevendays);
router.get('/getusername', protect, getusername);

module.exports = router;
