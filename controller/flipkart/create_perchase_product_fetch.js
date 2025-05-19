
import create_perchase_product_model from '../../models/create_perchase_product_model.js'
const create_perchase_product_fetch = async (req,res)=>{
   try {
  const products = await create_perchase_product_model.find({})
   
  res.json(products)
   } catch (e) {
     res.json({
       success:false,
       message:e.message
     })
   }
   
}

export default create_perchase_product_fetch