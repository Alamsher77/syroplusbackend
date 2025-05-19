
import mongoose from 'mongoose'

const perchase_schema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
 categary:{
   type:String,
   required:true
 },
  dailyincome:{
    type:Number,
    required:true
  },
  incomeperiod:{
    type:Number,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  currentObtain:{
    type:Number,
    default:0
  },
  availbleObtain:{
    type:Number,
    default:0
  },
  totalcount: { type: Number, default:0},
  status: { type: String, enum: ["incomplete", "complete"], default: "incomplete" }
},{timestamps:true})

const create_perchase_product_model = mongoose.model('perchase',perchase_schema)

export default create_perchase_product_model