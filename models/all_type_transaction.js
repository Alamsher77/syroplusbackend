import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  userId:{
    type:String,
  },
  transaction_type:{
  type:String,
  required:true
  },
  whoinvitecode:{
    type:String, 
  },
  transaction_amount:{
    type:Number,
    required:true,
  },
  phone:{
    type:Number,
  },
  name:{
    type:String,
  },
  categary:{
    type:String
  },
  
  
  createdAt: { type: Date, expires: '10d', default: Date.now } 
})

const all_type_transaction_model = mongoose.model('all_type_transaction_history',schema)

export default all_type_transaction_model