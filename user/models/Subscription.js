const mongoose = require('mongoose')
require('dotenv').config()

const SubscriptionSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  dishId:{
    type:mongoose.Types.ObjectId,
    ref:"Dish"
  },
  quantity:{
    type:Number,
    default:30
  },
  status:{
    type:String,
    default:"ACTIVE",
    enum:[
        "ACTIVE",
        "EXPIRED"
    ]
  },
  
},{timestamps:true})


module.exports = mongoose.model('Subscription',SubscriptionSchema)