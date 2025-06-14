
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  userId:{type:String,required:true}, 
  razorpay_order_id:{type:String},
  razorpay_payment_id:{type:String},
  recharge_amount:{type:Number,required:true}, 
  status:{type:String,required:true}
},{timestamps:true})

const allrechargeModel = mongoose.model('allrechargetransaction',schema)

export default allrechargeModel