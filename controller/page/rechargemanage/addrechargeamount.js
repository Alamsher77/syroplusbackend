import isValidPhoneNumber from '../../../validatenumber.js'
import alluserModel from '../../../models/allusermodel.js'
import allrechargeMolde from '../../../models/allrecharge_transaction.js'
 import Razorpay  from 'razorpay' 
import crypto from  'crypto' 


const create_payment_razorpay = async(req,res)=>{
  const {amount,currency} = req.body
  try { 
    const razorpay = new Razorpay({
  key_id:process.env.RAZARPAY_ID,
  key_secret:process.env.RAZARPAY_SECRATE_KEY
})

const options = {
    amount: amount * 100, // Amount is in smallest unit (paise for INR)
    currency, 
    receipt: `receipt_${Date.now()}`,
  };
  
  const order = await razorpay.orders.create(options) 
    res.json({success:true,order:{...order,key:process.env.RAZARPAY_ID}}) 
  } catch (e) {
    res.json({
      success:false,
      message:e.message
    })
    console.log(e.message)
  }
}

const verify_razorpay_payment = async (req,res)=>{ 

  try {
     const {razorpay_order_id, razorpay_payment_id, razorpay_signature,amount } = req.body;

  const hash = crypto
    .createHmac("sha256", process.env.RAZARPAY_SECRATE_KEY)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (!hash === razorpay_signature) { 
    res.json({success:false,message: "payment failure" });
    return  false
  }
  
  const allrecharge_transaction = new allrechargeMolde({
   userId:req.userId.userId, 
  razorpay_order_id,
  razorpay_payment_id,
  recharge_amount: Number(amount), 
  status:"success"
  })
  
  
  const updateRechargeAmount = await alluserModel.findOneAndUpdate({_id:req.userId.userId},{$inc:{wallet:Number(amount),total_recharge:Number(amount)}})
  if(!updateRechargeAmount || !allrecharge_transaction){
    res.json({
    success:false,
    message:'payment failure'
  })
  return false 
  } 
  await allrecharge_transaction.save()
  res.json({
    success:true,
    message:'Recharge SuccessFull'
  }) 
  } catch (e) {
    res.json({
      success:false,
      message:e.message
    })
   
  }
}
export  {create_payment_razorpay,verify_razorpay_payment}