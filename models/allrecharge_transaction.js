
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  userId:{type:String,required:true},
  name:{type:String,required:true},
  recharge_amount:{type:Number,required:true},
  utrnumber:{type:Number,required:true},
  status:{type:String,default:'Proccess',}
},{timestamps:true})

const allrechargeModel = mongoose.model('allrechargetransaction',schema)

export default allrechargeModel