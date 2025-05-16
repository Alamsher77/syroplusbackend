// middleware/auth.js
import jwt from 'jsonwebtoken'
const isLoggedIn = async(req, res, next) => {
  const token = req.cookies?.token
  if (!token) {
    res.redirect('/authe/signin')
  // res.status(400).json({
  //   success:false,
  //   message:'Please login',
  //   auth:true,
  //   data:token
  //   })
      return false 
    }
  jwt.verify(token,process.env.COOKIES_DATA, (err, user) => {
     if(err){
       console.log('error',err.message)
     }
      
    req.userId = user
    next()
  }); 
}
const allUserAuthe = async(req, res, next) => {
  const token = req.cookies
  console.log(token)
  res.json({
    success:false,
    message:'goodo'
  })
  return false
  if (!token) { 
    res.status(400).json({
    success:false,
    message:'Please login', 
    })
      return false 
    }
  jwt.verify(token,process.env.All_COOKIES_DATA, (err, user) => {
     if(err){
       console.log('error',err.message)
     } 
    req.userId = user
    next()
  }); 
}
 

export  {isLoggedIn,allUserAuthe};
