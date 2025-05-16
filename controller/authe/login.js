import jwt from 'jsonwebtoken'
import userModel from '../../models/usermodel.js'
import flash from 'express-flash'
import bcrypt from 'bcryptjs'
const login = async (req,res)=>{
  const {email,password} = req.body
   
  try {
     if(!email || !password) {
      req.flash('error',"Please enter the email or  password")
      res.redirect('/authe/signin')
      return false
    }
    const availbleuser = await userModel.findOne({email})
    if(!availbleuser) {
      req.flash('error',"email or password is wrong")
      res.redirect('/authe/signin')
      return false
    }
   
const compearPassword = bcrypt.compareSync(password,availbleuser.password)
 
  if(!compearPassword) {
      req.flash('error',"email or password is wrong")
      res.redirect('/authe/signin')
      return false
    }
 const filtterUsers = { 
      name:availbleuser.name,
      email:availbleuser.email, 
    } 
 const token = await  jwt.sign(filtterUsers,process.env.COOKIES_DATA, { expiresIn: '10d' });
   
  res.cookie('token', token, {
    maxAge: 864000000,
    secure: true,
    httpOnly: true,
    sameSite:"strict"
  });
 if (token) {
   return res.redirect("/admin-invest")
 }
  } catch (e) {
    console.log(e.message)
    req.flash('error',e.message)
    res.redirect('/authe/signin')
  }

 
}
export default login