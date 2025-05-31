
import allrechargeMolde from '../../../models/allrecharge_transaction.js'
const rechargetransaction = async (req,res)=>{
  
  let rechargeRequests = await allrechargeMolde.find({status:'Proccess'})

let completedRecharges = await allrechargeMolde.find({status:'completed'}); 
  res.render("page/rechargemanagement",{rechargeRequests,completedRecharges,user:req.userId, success:req.flash("success"),
      error:req.flash('error'), })
}

export default rechargetransaction