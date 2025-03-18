import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter your name"],
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required: [true,"Please enter a password"],
        minlength: [6,"Password must be at least 6 characters long"],
    },
},{timestamps:true});

userSchema.pre("save",async function(){
    if(!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password);
    return isMatch;
}

userSchema.methods.createJWT = function(){
    return JWT.sign(
        {
        _id: this._id,
        email: this.email,
        password: this.password
        },
        process.env.JWT_SECRET,
        {
        expiresIn: process.env.JWT_EXPIRY
        }
    )
}

const userModel = mongoose.model('User',userSchema);
export default userModel;