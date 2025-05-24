import investmentmodel from '../../../models/Investproduct.js'
import mongoose from 'mongoose'
const addinvestproduct = async(req,res)=>{
   const {...product} = req.body
   const id = product.id
  if (id) {
    await investmentmodel.findByIdAndUpdate(id,{
      ...product,
      totalincome: Number(product.dailyincome) * Number(product.incomeperiod) + Number(product.price),
     percentage:parseFloat((Number(product.dailyincome) / Number(product.price) * 100 ).toFixed(2))
      
    })
     req.flash('success',"existing record update")
    res.redirect("/admin-invest/productmanegment")
   
     return false
   }
   const createproduct = new investmentmodel({
     ...product,
     availblestock:0,
     image:'',
     totalincome: Number(product.dailyincome)* Number(product.incomeperiod) + Number(product.price), 
     percentage:parseFloat((Number(product.dailyincome) / Number(product.price) * 100 ).toFixed(2))
   })
   
  await createproduct.save()
   req.flash('success',"product added")
  res.redirect("/admin-invest/productmanegment")
  
}
export default addinvestproduct