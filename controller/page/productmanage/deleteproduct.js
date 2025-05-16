import investmentmodel from '../../../models/Investproduct.js'
const deleteproduct = async (req,res)=>{
  try {
    /* code */
    const deleteresult = await investmentmodel.findByIdAndDelete({_id:req.params.id})
    req.flash('success',"Product deleted success") 
  res.redirect('/admin-invest/productmanegment')
  } catch (e) {
    req.flash('error',e.message) 
  res.redirect('/admin-invest/productmanegment')
  }
 
}

export default deleteproduct