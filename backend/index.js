require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const port=process.env.PORT || 3000;
console.log("PORT VALUE IS 👉", port);
const cors=require('cors');
const connectDB = require('./config/db');
const authroutes = require('./routes/authroutes');
const productroutes = require('./routes/productroutes');
const invoiceroutes = require('./routes/invoiceroutes');
const CustomerRoutes = require('./routes/Customerroutes');
const reportroutes = require('./routes/reportroutes');
const invoicedetailroutes = require('./routes/invoicedetailroutes');


app.use(
    cors({
      origin: "http://localhost:5173", // frontend URL
      credentials: true,               // VERY IMPORTANT
    })
  );
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authroutes);
app.use('/api/products', productroutes);
app.use('/api/invoice', invoiceroutes);
app.use('/api/customers', CustomerRoutes);
app.use('/api/reports', reportroutes);
app.use('/api/details', invoicedetailroutes);

app.get('/', (req,res)=>{
    res.send('Hello World!');
})

app.listen(port, async()=>{
    console.log(`Server is running on port ${port}`);
    await connectDB();
})