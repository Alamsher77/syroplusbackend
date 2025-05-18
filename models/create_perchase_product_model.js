
import mongoose from 'mongoose'

const perchase_schema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  product:{
    type:Object,
    required:true
  },
  status:{
    type:String,
    default:'process'
  }
},{timestamps:true})

const create_perchase_product_model = mongoose.model('perchase',perchase_schema)

export default create_perchase_product_model