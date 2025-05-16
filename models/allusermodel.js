import mongoose from 'mongoose'

const alluserschema = new mongoose.Schema({
  name:{
    type:String,
    required:true, 
  },
  phone:{
    type:Number,
    required:true,
    
  },
  password:{
    type:String,
    required:true,
  },
  invitecode:{
    type:String,
    required:true,
    unique:true,
  },
  whoinvitecode:{
    type:String,
  },
  wallet:{
    type:Number,
  },
  total_recharge:{
    type:Number,
  },
  total_withdrawal:{
    type:Number,
  },
  total_income:{
    type:Number,
  },
  today_income:{
    type:Number,
  },
  team_size:{
    type:Number,
  },
  team_income:{
    type:Number,
  },
})

const alluserModel = mongoose.model('alluser',alluserschema)

export default alluserModel