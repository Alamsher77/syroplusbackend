
import all_type_transaction_model from '../../models/all_type_transaction.js'
import alluserModel from '../../models/allusermodel.js'
const fetch_all_transaction = async (req,res)=>{
   try { 
   
 const  products = await all_type_transaction_model.find({userId:req.userId.userId})
   
  res.json(products)
   } catch (e) {
     res.json({
       success:false,
       message:e.message
     })
   }
   
}
const fetch_all_transaction_product = async (req,res)=>{
   try { 
   
  const finduser = await alluserModel.findOne({_id:req.userId.userId})

 const  products = await all_type_transaction_model.find({whoinvitecode:finduser.invitecode})
   
  res.json(products)
   } catch (e) {
     res.json({
       success:false,
       message:e.message
     })
   }
   
}

export  {fetch_all_transaction,fetch_all_transaction_product}