
import jwt from 'jsonwebtoken'
import alluserModel from '../../models/allusermodel.js' 
import bcrypt from 'bcryptjs'
import isValidPhoneNumber from '../../validatenumber.js'
const alluserlogin = async (req,res)=>{
  const {...users} = req.body 
  console.log(users)
  try {
     if(!users?.phone || !users?.password) {
      res.json({
       success:false,
       message:'feilds required'
     })
      return false
    }
    if(!isValidPhoneNumber(users?.phone)){
      res.json({
        success:false,
        message:'please add valid number'
      })
      return false
    }
    const availbleuser = await alluserModel.findOne({phone:users?.phone})
    if(!availbleuser) {
      res.json({
        success:false,
        message:'User Or Password Wrong'
      })
      return false
    }
   
const compearPassword = bcrypt.compareSync(users?.password,availbleuser.password)
 
  if(!compearPassword) {
      res.json({
        success:false,
        message:'phone or password is wrong'
      })
      return false
    }
   
 const token = await  jwt.sign({userId:availbleuser?._id},process.env.All_COOKIES_DATA, { expiresIn: '2d' });
    console.log(token)
  res.json({
    success:true,
    message:'Login Success',
    token
  })
  } catch (e) {
    console.log('catch error ',e.message)
    res.json({
      success:false,
      message:e.message
    })
  }

 
}
export default alluserlogin