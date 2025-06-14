// middleware/auth.js
import jwt from 'jsonwebtoken'
const isLoggedIn = async(req, res, next) => {
  const token = req.cookies?.token
  if (!token) {
    res.redirect('/authe/signin')
    res.status(400).json({
    success:false,
    message:'Please login',
    auth:true,
    data:token
    })
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
const flipkartauthe = async(req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];  
  if (token == null) { 
    res.json({
    success:false,
    message:'authentication faild', 
    })
      return false 
    }
  jwt.verify(token,process.env.All_COOKIES_DATA, (err, user) => {
     if(err){
      console.log(`verify error : ${err}`)
     } 
    req.userId = user
    next()
  }); 
}


export {isLoggedIn,allUserAuthe,flipkartauthe};
