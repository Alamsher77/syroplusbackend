import mongoose from 'mongoose'
import alluserModel from '../../models/allusermodel.js'
import allrechargeModel from '../../models/allrecharge_transaction.js'
import Withdrawal from '../../models/withdrawal.js'
const index = async(req,res)=>{
  const arr = ['almahser ansari','samsher ansari','mojahid ansari']
  try {
    /* code */ 
 
const getrechargedata = await allrechargeModel.find({status:'completed'})
  const totalusers = await alluserModel.find({})
  const withdrawallist = await Withdrawal.find({})
 
 const  totalrecharge = getrechargedata.reduce((prev,next)=>{
  return  prev + next.recharge_amount
  },0).toLocaleString()


const recentwithdrawal = withdrawallist.slice(-5).map((item)=>{
  return { 
    phone:item.phone,
    amount:item.amount,
    status:item.status
  }
})
console.log(withdrawallist)
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