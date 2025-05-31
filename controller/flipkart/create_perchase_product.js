import create_perchase_product_model from '../../models/create_perchase_product_model.js'
import alluserModel from '../../models/allusermodel.js'
import all_type_transaction_method from '../all_type_transaction.js'
const create_perchase_product = async (req,res)=>{
try {
    const userId = req.userId.userId
 const {dailyincome,price,incomeperiod,name,categary} = req.body 
 
  const createPerchaseData = new create_perchase_product_model({
    userId, 
    dailyincome,
    name,
    categary, 
    incomeperiod,
    price,
    availbleObtain:price + dailyincome * incomeperiod
  }) 
  const getuserdata = await alluserModel.findOne({_id:userId})
  if(!getuserdata){
   res.json({
    success:false,
    message:'user note found'
  })
  return false
  }
  if (getuserdata.wallet < price) {
  res.json({
    success:false,
    message:'unsufficient balance'
  })
  return false
  }
  const result = await alluserModel.findOneAndUpdate( {_id:userId},{ $inc: { wallet: - price,total_investment: price} }, 
      { new: true })
  
  if(!result) {
    res.json({
    success:false,
    message:'product purchase failed'
  })
  return false
  }
const teamdata =  await alluserModel.findOneAndUpdate({invitecode:getuserdata.whoinvitecode},{$inc: {wallet: 8 / 100 * price,team_income: 8 / 100 * price,} }, 
      { new: true })                 
 
 if (teamdata) {
   all_type_transaction_method({transaction_amount: 8 / 100 * price,transaction_type:'team',whoinvitecode:getuserdata?.whoinvitecode,phone:getuserdata.phone})
 }

await createPerchaseData.save()
  res.json({
    success:true,
    message:'product purchased successfull'
  })
} catch (e) {
  console.log(e.message)
  res.json({
    success:false,
    message:e.message
  })
}
}

export default create_perchase_product
