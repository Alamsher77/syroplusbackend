import express from 'express'
import {isLoggedIn,flipkartauthe} from '../authmiddleware/index.js'

const adminpannelroute = express.Router()

import index from '../controller/page/index.js'
import alluserModel from '../models/allusermodel.js'
adminpannelroute.get('/',isLoggedIn,index)
adminpannelroute.get('/usermanegment',async(req,res)=>{
 
  const users =  await alluserModel.find({})
 
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
import {addrechargeamount,createrechargetransation,update_status_and_userrecharge_amount} from '../controller/page/rechargemanage/addrechargeamount.js'
import rechargetransaction from '../controller/page/rechargemanage/rechargetransaction.js'
adminpannelroute.get('/rechargemanagement',isLoggedIn,rechargetransaction)
adminpannelroute.post('/addrechargeamount',isLoggedIn,addrechargeamount)
adminpannelroute.post('/createrechargetransation',flipkartauthe,createrechargetransation)
adminpannelroute.post('/update_status_and_userrecharge_amount',isLoggedIn,update_status_and_userrecharge_amount)
 
export default adminpannelroute 
