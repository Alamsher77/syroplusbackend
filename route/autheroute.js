import express from 'express'
import {isLoggedIn} from '../authmiddleware/index.js' 

const autheroute = express.Router()

import signup from '../controller/authe/signup.js'
import login from '../controller/authe/login.js'
autheroute.get('/signup',isLoggedIn,(req,res)=>{
  try {
    /* code */ 
    res.render('singup',{
      layout:false,
      success:req.flash("success"),
      error:req.flash('error'), 
    })
  } catch (e) {
    console.log(e.message)
     res.render('singup',{
      layout:false,
      success:req.flash("success"),
      error:req.flash('error'), 
    })
  }
  
})
autheroute.post('/signup',signup)
autheroute.get('/signin',(req,res)=>{
  const userId = req.cookies?.token
 if (userId) {
    return res.redirect("/admin-invest")
    }
   res.render('login',{
      layout:false,
      success:req.flash("success"),
      error:req.flash('error'), 
    })
})
autheroute.post('/signin',login)

// all user login or singup
import allusersingup from '../controller/authe/allusersingup.js'
autheroute.post('/alluser',allusersingup)
autheroute.get('/alluser/',(req,res)=>{
  const whoinvite = req.query.id
   res.render('alluser/allusersingup',{
      layout:false,
      success:req.flash("success"),
      error:req.flash('error'),
      whoinvite
    })
     
})
autheroute.get('/download',(req,res)=>{
  res.render('alluser/download',{layout:false,})
})
export default autheroute 