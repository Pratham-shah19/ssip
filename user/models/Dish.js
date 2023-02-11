const mongoose = require('mongoose')
require('dotenv').config()

const DishSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please provide name'],
  },
  imageUrl:{
    type:String,
    required:[true,'Please provide image']
  },
  rating:{
    type:mongoose.Decimal128,
    default:1
  },
  noOfRating:{
    type:Number,
    default:0
  },
  category:{
    type:String,
    required:[true,'Please provide category'],
  },
  price:{
    type:Number,
    required:[true,'Please provide price']
  },
  quantity:{
    type:Number,
    default:0
  },
  isAvailable:{
    type:Boolean,
    default:false
  },
  prodId:{
    type:String,
    required:[true,'Please provide product id']
  },
  priceId:{
    type:String,
    required:[true,'Please provide price id']
  },
  subscriptionAvailable:{
    type:Boolean,
    default:false
  },
  slot1:{
    type:Number,
    default:0
  }
  ,slot2:{
    type:Number,
    default:0
  }
  ,slot3:{
    type:Number,
    default:0
  },
})


module.exports = mongoose.model('Dish',DishSchema)