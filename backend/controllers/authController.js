const User=require('../models/UserModel');
const Shop=require('../models/ShopModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const register=async (req,res)=>{
    try{
        const {name,email,password,shopName}=req.body;
        console.log("Received registration data:", {name, email,password, shopName});
        const existinguser=await User.findOne({email});

        if(existinguser){
            return res.status(400).json({message:'User already exists'});
        }

        const shop=await Shop.create({shopName});

        const hashedpassword=await bcrypt.hash(password,10);

        const newUser= await User.create({
            name,
            email,
            password:hashedpassword,
            role:'owner',
            shopId:shop._id
        })
        
        shop.ownerId=newUser._id;
        await shop.save();

        res.status(201).json({message:'User registered successfully'});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        console.log("Received login data:", {email, password});
        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({message:'Invalid Credentials'});
        }

        const ismatch=await bcrypt.compare(password,user.password);

        if(!ismatch){
            return res.status(400).json({message:'password wrong'});
        }
        console.log("SIGN SECRET 👉", process.env.JWT_SECRET)
        const token=jwt.sign(
            {
                userId:user._id,
                role:user.role,
                shopId:user.shopId,
                name:user.name,
            },
            
            "TEMP_SECRET_123",
            {expiresIn:'7d'},
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,      // localhost
            sameSite: "lax",
           // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

        res.status(200).json({
            message: "Login successful",
            user: {
              id: user._id,
              name: user.name,
              role: user.role,
              shopId: user.shopId,
            },
          });

    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const logout = (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,      // prod me true, local me false
      sameSite: "none",  // agar frontend & backend alag origin hain
    });
  
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  };
  

module.exports={register,login,logout};