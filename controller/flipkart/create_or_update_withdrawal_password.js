import alluserModel from '../../models/allusermodel.js'
import bcrypt from 'bcryptjs'
const create_withdrawal_password = async(req,res)=>{
  const {newWithdrawalPassword,reNewWithdrawalPassword} = req.body
  
  try {
    if(!newWithdrawalPassword || !reNewWithdrawalPassword){
      res.json({
      success:false,
      message:'Fields Required'
    })
    return  false
    }
    if(newWithdrawalPassword != reNewWithdrawalPassword){
      res.json({
      success:false,
      message:'Create Withdrawa Password or Re Create Withdrawal Password Note Match'
    })
    return  false
    }
   
    const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(newWithdrawalPassword,salt)
   const create = await alluserModel.findOneAndUpdate({_id:req.userId.userId},{$set:{withdrawal_password:hashPassword}},{new:true})
   
   console.log(create)
   if(!create){
     res.json({
       success:false,
       message:'Withdrawal Password Created Faild'
     })
   }
   
   res.json({
       success:true,
       message:'Withdrawal Password Created SuccessFully'
     })
  } catch (e) {
    res.json({
      success:false,
      message:e.message
    })
  }
}
const update_withdrawal_password = async(req,res)=>{
  const {oldWithdrawalPassword,updateWithdrawalPassword} = req.body
   
  try {
    if(!oldWithdrawalPassword || !updateWithdrawalPassword){
      res.json({
      success:false,
      message:'Fields Required'
    })
    return  false
    } 
  
  const findWidthdawalPassword = await alluserModel.findOne({_id:req.userId.userId})
 
  
  const comparePassword = bcrypt.compareSync(oldWithdrawalPassword,findWidthdawalPassword.withdrawal_password)
     
  if(!comparePassword){
    res.json({
      success:false,
      message:'Older Password is Wrong !'
    })
    return false
  }

    const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(updateWithdrawalPassword,salt)
   
   const updatepassword = await alluserModel.findOneAndUpdate({_id:req.userId.userId},{$set:{withdrawal_password:hashPassword}})
    res.json({
      success:true,
      message:'Withdrawal Password Updated SuccessFully'
    })
  } catch (e) {
    res.json({
      success:false,
      message:e.message
    })
  }
}


export {create_withdrawal_password,update_withdrawal_password}