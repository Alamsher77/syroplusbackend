import investmentmodel from '../../../models/Investproduct.js'
import mongoose from 'mongoose'
const fetchproductinvest = async(req,res)=>{
   try {
  const products = await investmentmodel.find({})
   
  // await createproduct.save()
   res.render("page/productmanagement",{
     products,user:req.userId,
     success:req.flash("success"),
     error:req.flash('error'),
      })
   } catch (e) {
     console.log(e.message)
   }
   
}
export default fetchproductinvest