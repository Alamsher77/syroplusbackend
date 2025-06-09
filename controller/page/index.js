import mongoose from 'mongoose'
import alluserModel from '../../models/allusermodel.js'
import allrechargeModel from '../../models/allrecharge_transaction.js'
const index = async(req,res)=>{
  const arr = ['almahser ansari','samsher ansari','mojahid ansari']
  try {
    /* code */ 
 
const getrechargedata = await allrechargeModel.find({status:'completed'})
  const totalusers = await alluserModel.find({})
 const  totalrecharge = getrechargedata.reduce((prev,next)=>{
  return prev.recharge_amount + next.recharge_amount
}).toLocaleString() 
    
  res.render('index',{
      user:req.userId,
      totalusers,
      totalrecharge
    })
  } catch (e) {
    
    console.log(e.message)
  }

}

export default index