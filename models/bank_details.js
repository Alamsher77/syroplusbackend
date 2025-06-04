import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name:{type:String,required:true},
  userId:{type:String,required:true},
  bankName:{type:String,required:true},
  accountNumber:{type:Number,required:true},
  ifscCode:{type:String,required:true}
},{timestamps:true})

const bankdetailsModel = mongoose.model('bankdetails',schema)

export default bankdetailsModel