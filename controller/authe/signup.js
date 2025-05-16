import jwt from 'jsonwebtoken'
import userModel from '../../models/usermodel.js'
import flash from 'express-flash'
import bcrypt from 'bcryptjs'
const signup = async (req,res)=>{
  const {password,email,name,conformpassword} = req.body
  try {
     
    const availbleuser = await userModel.findOne({email})
    if(availbleuser) {
      req.flash('error',"User already resisterd")
      res.redirect('/authe/signup')
      return false
    }
     if(password !== conformpassword) {
      req.flash('error',"password or conformpassword note match")
      res.redirect('/authe/signup')
      return false
    }
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password,salt)
  const createuser = new userModel({
    name,
    email,
    password:hashPassword
  })
   
 await createuser.save()
  return res.redirect("/admin-invest")
 
  } catch (e) {
    console.log(e.message)
    req.flash('error',e.message)
    res.redirect('/authe/signup')
  }

 
}
export default signup