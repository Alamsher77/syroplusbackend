import isValidPhoneNumber from '../../../validatenumber.js'
import alluserModel from '../../../models/allusermodel.js'
import allrechargeMolde from '../../../models/allrecharge_transaction.js'
const addrechargeamount = async(req,res)=>{
  try {
   const {phone,price} = req.body
     if(!price || !phone){
       req.flash('error',"please addd number or price")
        res.redirect('/admin-invest/rechargemanagement')
        return  false
     }
    
     if(!isValidPhoneNumber(phone)){
        req.flash('error',"please add valide number")
        res.redirect('/admin-invest/rechargemanagement')
        return  false
     }
     
     
    const result =  await alluserModel.findOneAndUpdate( {phone},  
      { $inc: { wallet: price,total_recharge:price } }, 
      { new: true }    )
      if (!result) {
        req.flash('error',"recharge  amoun update  failed")
       res.redirect('/admin-invest/rechargemanagement')
       return false
      }
      console.log(result)
     req.flash('success',"recharge amount update existing users")
       res.redirect('/admin-invest/rechargemanagement')
  } catch (e) {
    console.log(e.message)
     req.flash('error',e.message)
     res.redirect('/admin-invest/rechargemanagement') 
  }

     
      console.log(req.body)
}

const createrechargetransation = async(req,res)=>{
  try {
    const data = req.body
    const utrnumberget = await allrechargeMolde.findOne({utrnumber:data?.utrnumber})
    if(utrnumberget){
      res.json({
        success:false,
        message:'UTR Number usede'
      })
      return false
    }
    const getuser = await alluserModel.findOne({_id:req.userId.userId})
    const createrecharge = await allrechargeMolde({
      ...data,
      userId:req.userId.userId,
      name:getuser.name
    })
    await createrecharge.save()
    console.log(createrecharge)
    res.json({
      success:true,
      message:'Recharge successfull'
    })
  } catch (e) {
    res.json({
      success:false,
      message:e.message
    })
  }
}

const update_status_and_userrecharge_amount = async (req,res)=>{
  const data = req.body
  // console.log(data)
  try {
     if(data?.type == 'faild'){
        const update =  await allrechargeMolde.findOneAndUpdate({_id:data.id},{$set:{status:'faild'}},{new:true})
    console.log(update)
        req.flash('success',"Payment Faild")
        res.redirect('/admin-invest/rechargemanagement')
        return false
     }
      
      const result =  await alluserModel.findOneAndUpdate({_id:data.userId},  
      { $inc: { wallet: Number(data.amount),total_recharge:Number(data.amount) } }, 
      { new: true })
      const update =  await allrechargeMolde.findOneAndUpdate({_id:data.id},{$set:{status:'completed'}},{new:true})
       
      req.flash('success',"Payment successfull")
        res.redirect('/admin-invest/rechargemanagement')
        
  } catch (e) {
    req.flash('error',e.message)
    res.redirect('/admin-invest/rechargemanagement')
    console.log(e.message)
  }
}
export  {addrechargeamount,createrechargetransation,update_status_and_userrecharge_amount}