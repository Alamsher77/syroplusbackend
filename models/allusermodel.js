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
    default:''
  },
  wallet:{
    type:Number,
    default:0
  },
  total_recharge:{
    type:Number,
    default:0
  },
  total_withdrawal:{
    type:Number,
    default:0
  },
  total_income:{
    type:Number,
    default:0
  },
  today_income:{
    type:Number,
    default:0
  },
  team_size:{
    type:Number,
    default:0
  },
  team_income:{
    type:Number,
    default:0
  },
  withdrawal_wallet:{
    type:Number,
    default:0,
  },
  total_investment:{
    type:Number, 
    default:0
  },
  total_obtain:{
    type:Number, 
    default:0
  }
})

const alluserModel = mongoose.model('alluser',alluserschema)

export default alluserModel