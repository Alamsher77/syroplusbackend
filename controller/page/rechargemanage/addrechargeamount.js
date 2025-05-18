import isValidPhoneNumber from '../../../validatenumber.js'
import alluserModel from '../../../models/allusermodel.js'
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

export default addrechargeamount