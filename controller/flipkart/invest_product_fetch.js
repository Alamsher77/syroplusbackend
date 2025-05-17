import investmentmodel from '../../models/Investproduct.js'
const investproductfetch = async (req,res)=>{
   try {
  const products = await investmentmodel.find({})
   
  res.json(products)
   } catch (e) {
     res.json({
       success:false,
       message:e.message
     })
   }
   
}

export default investproductfetch