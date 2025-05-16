import investmentmodel from '../../../models/Investproduct.js'
import mongoose from 'mongoose'
const addinvestproduct = async(req,res)=>{
   const {...product} = req.body
   
   const createproduct = new investmentmodel({
     ...product,
     availblestock:0,
     image:'',
     totalincome: Number(product.dailyincome)* Number(product.incomeperiod) + Number(product.price), 
     percentage:parseFloat((Number(product.dailyincome) / Number(product.price) * 100 ).toFixed(2))
   })
   
  await createproduct.save()
   console.log(product.name)
   res.redirect("/admin-invest/productmanegment")
   
}
export default addinvestproduct