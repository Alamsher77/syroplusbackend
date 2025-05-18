import express from 'express'
import {isLoggedIn} from '../authmiddleware/index.js'

const adminpannelroute = express.Router()

import index from '../controller/page/index.js'

adminpannelroute.get('/',isLoggedIn,index)
adminpannelroute.get('/usermanegment',isLoggedIn,(req,res)=>{
  const users = [{
    name:"Alamsher Ansari",
    email:"alamsheransari15@gmail.com",
    role:"Admin"
  },{
    name:"Samsher Ansari",
    email:"samsher27@gmail.com",
    role:"user"
  },{
    name:"Alamsher Ansari",
    email:"alamsheransari15@gmail.com",
    role:"Admin"
  },{
    name:"Samsher Ansari",
    email:"samsher27@gmail.com",
    role:"user"
  }]
 
  res.render("page/usersmanagement",{ user:req.userId,users})
})

import addinvestproduct from '../controller/page/productmanage/addinvestproduct.js'
import fetchproductinvest from '../controller/page/productmanage/fetchproductinvest.js'
import deleteproduct from '../controller/page/productmanage/deleteproduct.js'
import updateproduct from '../controller/page/productmanage/updateproduct.js'

adminpannelroute.get('/productmanegment',isLoggedIn,fetchproductinvest)
adminpannelroute.post('/productmanegment',isLoggedIn,addinvestproduct)
adminpannelroute.get('/deleteproduct/:id',isLoggedIn,deleteproduct)
adminpannelroute.get('/updateproduct/:id',isLoggedIn,updateproduct)

adminpannelroute.get("/logoute",isLoggedIn,(req,res)=>{
  if (req.userId) {
    res.clearCookie('token',{
    maxAge: 864000000,
    secure: true,
    httpOnly: true,
    sameSite:"None"
  });
    res.redirect("/authe/signup")
    return false
  }
  res.send("you already logout")
  
})

adminpannelroute.get('/withdrawalmanagement',isLoggedIn,(req,res)=>{
  let withdrawals = [{
    id:1,
    user:'almasher ansari',
    amount:2342,
    method:'upi',
    status: 'Pending'
  }]
  res.render("page/withdrawmanagement",{withdrawals, user:req.userId})
})

// recharge api controller
import addrechargeamount from '../controller/page/rechargemanage/addrechargeamount.js'
adminpannelroute.get('/rechargemanagement',isLoggedIn,(req,res)=>{
 let rechargeRequests = [
  { userId: "gurjar123", amount: 200 },
  { userId: "gurjar456", amount: 500 }
];

let completedRecharges = [];
  res.render("page/rechargemanagement",{rechargeRequests,completedRecharges,user:req.userId, success:req.flash("success"),
      error:req.flash('error'), })
})
adminpannelroute.post('/addrechargeamount',isLoggedIn,addrechargeamount)
 
export default adminpannelroute 
