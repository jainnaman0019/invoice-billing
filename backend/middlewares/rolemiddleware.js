const allowrole=(...roles)=>{
    return (req,res,next)=>{
        console.log("User Role 👉", req.user.role);
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"You are not authorized to access this resource"})
        }
        next()
    }
}

module.exports={allowrole};