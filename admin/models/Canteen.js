const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//schema definition
const CanteenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter valid email",
    ],
  },
  password:{
    type:String,
    required:[true,'Please provide password'],
    minlength:8
  },
  wallet:{
    type:Number,
    default:0
  },
  otp:{
    type:Number,
    default:0
  },
  cashotp:{
    type:Number,
    default:0
  }
});

CanteenSchema.pre('save',async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})

CanteenSchema.methods.createJWT = function(){
  return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
CanteenSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch
}

module.exports = mongoose.model('Canteen',CanteenSchema)