
import alluserModel from '../../models/allusermodel.js'
const convert_to_withdrawal_wallete = async (req,res)=>{
   
  try {
    if (req.body.amount == 0) {
      res.json({
      success:false,
      message:'unsufficient balance'
     })
     return false
    }
     const convert = await alluserModel.findOneAndUpdate({_id:req.userId.userId},{$inc:{withdrawal_wallet:req.body.amount},$set:{total_withdrawal:0}},{new:true})
      console.log(convert)
      if(!convert){
        res.json({
          success:false,
          message:'converted faild'
        })
        return  false
      }
    res.json({
      success:true,
      message:'converted successfull'
     })
  } catch (e) {
    res.json({
      success:false,
      message:e.message
    })
  }
 
}

export default convert_to_withdrawal_wallete