
const updateproduct = async (req,res)=>{
  console.log(`update ${req.params.id}`)
  req.flash('success',"product updated") 
  res.redirect('/admin-invest/productmanegment')
}
export default updateproduct