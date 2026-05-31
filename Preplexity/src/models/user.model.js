import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    trim:true,
    required: [true,"Username is Required"],
    unique : [true,"Username is Already taken"]
  },
  email:{
    type :String,
    required :[ true ," Email is required to  Fill"],
    unique :[ true ,"Email is already taken"],
    lowercase: true,
    trim:true
  },
  password:{
    type:String,
    required : [true , "Password is required"],
    select : false,
    minlength: 6
  },
  verified:{
    type:Boolean,
    default: false
  }
},{timestamps : true})

userSchema.pre('save' , async function () {
  if(!this.isModified('password')) return ;
  this.password = await bcrypt.hash(this.password ,10);
  
})

userSchema.methods.comparePassword = function(candiatePassword){
  return bcrypt.compare(candiatePassword ,this.password)
}

const userModel = mongoose.model("User" , userSchema);

export default userModel ;