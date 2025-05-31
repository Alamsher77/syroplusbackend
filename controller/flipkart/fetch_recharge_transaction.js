import allrechargeModel from '../../models/allrecharge_transaction.js'
const fetch_recharge_transaction = async (req,res)=>{
  
  const alltransaction = await allrechargeModel.find({userId:req.userId.userId}) 
  res.json(alltransaction)
   
}
export default fetch_recharge_transaction