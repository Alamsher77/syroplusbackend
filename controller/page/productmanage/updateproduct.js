import investmentmodel from '../../../models/Investproduct.js'
const updateproduct = async (req,res)=>{
  const products = await investmentmodel.findOne({_id:req.params.id})
  res.render("page/productmanagement",{
     products,user:req.userId,
     success:req.flash("success"),
     error:req.flash('error'),
      })
}
export default updateproduct