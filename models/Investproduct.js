import mongoose from 'mongoose'
const Schema = new mongoose.Schema({
  name:{
    type:String,
    required:true, 
  },
  price:{
    type:Number,
    required:true,
  },
  dailyincome:{
    type:Number,
    required:true,
  },
  incomeperiod:{
    type:Number,
    required:true
  },
  totalstock:{
    type:Number,
    required:true
  },
  image:{
    type:Object,
    required:true
  },
  totalincome:{
    type:Number,
    required:true
  },
  availblestock:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  categary:{
    type:String,
    required:true
  },
  percentage:{
    type:String,
    required:true
  }
})

const investmentmodel = mongoose.model('investproduct',Schema)
export default investmentmodel