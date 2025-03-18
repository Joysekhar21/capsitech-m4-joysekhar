import userModel from "../models/user.model.js";

const registerController = async (req, res) => {
    try {
        const {name,email,password} = req.body;
        if(!name){
            return res.status(400).json({message:"Name is required"});
        }
        if(!email){
            return res.status(400).json({message:"Email is required"});
        }
        if(!password){
            return res.status(400).json({message:"Password is required"});
        }
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists Please login"});
        }
        const user = await userModel.create({
            name,
            email,
            password
        })
        const token = user.createJWT();
        res.status(201).json({
            message: "User Created Successfully",
            success: true,
            user:{
                name: user.name,
                email: user.email,
            },
            token
        })
} catch (error) {
    console.log("Error in user registration",error);
    res.status(500).json({message: "Internal Server Error on registration", error});
}
}

const loginController = async (req, res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Please provide all fields"})
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"User Not Found"})
        }
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid Username or Password"})
        }
        user.password = undefined
        const token = user.createJWT();
        res.status(200).json({
            message: "Login Successfully",
            success: true,
            user,
            token
        })
    } catch (error) {
        console.log("Error in user registration",error);
        res.status(500).json({message: "Internal Server Error on login", error});
    }
}

const getUserController = async (req,res)=>{
   try {
     const user = req?.user;
     const isUser = await userModel.findOne({_id:user._id})
     if(!isUser){
         return res.sendStatus(401);
     }
     res.status(200).json({
         message: "",
         success: true,
         user: {
            "_id": isUser._id,
            name: isUser.name,
            email: isUser.email,
            createdAt : isUser.createdAt
         },
     })
   } catch (error) {
    console.log("Error in user retrieved",error);
    res.status(500).json({message: "Internal Server Error on User retrieved", error});
   }
}

export  {registerController,loginController,getUserController};