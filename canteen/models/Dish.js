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
  category:{
    type:String,
    required:[true,'Please provide category'],
  },
  price:{
    type:Number,
    required:[true,'Please provide price']
  }
})


module.exports = mongoose.model('Dish',DishSchema)