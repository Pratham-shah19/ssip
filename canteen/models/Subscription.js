const mongoose = require('mongoose')
require('dotenv').config()

const SubscriptionSchema = new mongoose.Schema({
  subscription_id:{
    type:Number,
    required:[true,'Please provide subscription id']
  },
  username:{
    type:String,
    required:[true,'Please provide name']
  },
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
  paymentmode:{
    type:String,
    default:"KOT"
  }
  
},{timestamps:true})


module.exports = mongoose.model('Subscription',SubscriptionSchema)