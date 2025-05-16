import mongoose from 'mongoose'
import alluserModel from '../../models/allusermodel.js'
import isValidPhoneNumber from '../../validatenumber.js'
import bcrypt from 'bcryptjs'
const allusersingup = async(req,res)=>{
  const {...users} = req.body 
  try {
  
    const numbervalidate = isValidPhoneNumber(users.phone)
    if(!numbervalidate){
      req.flash('error','please valid phone number')
      res.redirect(`/authe/alluser${!users?.whoinvitecode ? "":"?id="+users?.whoinvitecode}`)
      return  false
    }
    
    if(users?.confirmPassword !== users?.password){
      req.flash('error','password or confirmPassword not match');
      res.redirect(`/authe/alluser${!users?.whoinvitecode ? "":"?id="+users?.whoinvitecode}`);
      return  false
    } 
  const alradyusrs = await alluserModel.findOne({phone:users.phone})
 
    if(alradyusrs){
      req.flash('error','user alrady acount created')
      res.redirect(`/authe/alluser${!users?.whoinvitecode ? "":"?id="+users?.whoinvitecode}`)
      return  false
    }
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(users?.password,salt)
    const invitetext = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let genrateinvitecode = ''
    
    for (var i = 0; i < 8; i++) {
      const rand = Math.floor(Math.random() * invitetext.length ) 
     genrateinvitecode += invitetext[rand]
    }
     const invite_url = `${req.protocol}://${req.headers.host+req.originalUrl}?id=${genrateinvitecode}`;
    const userinvitecodestatus = await alluserModel.findOne({invitecode:users?.whoinvitecode})
    if(userinvitecodestatus){
     const result =  await alluserModel.findOneAndUpdate( { invitecode:users?.whoinvitecode},  
      { $inc: { team_size: 1 } }, 
      { new: true }    )
      console.log(result)
    }
    const newusers = new alluserModel({
      ...users,
      invitecode:genrateinvitecode,
      password:hashPassword,
      wallet:0,
      total_recharge:0,
      total_withdrawal:0,
      total_income:0,
      today_income:0,
      team_size:0,
      team_income:0,
      invite_url,
    })
 
    console.log(newusers)
    await newusers.save()
   req.flash('success','Users Created SuccessFull') 
    res.redirect(`/authe/download`) 
     
  } catch (e) {
     req.flash('error',e.message)
     res.redirect(`/authe/alluser${!users?.whoinvitecode ? "":"?id="+users?.whoinvitecode}`)
  }
}

export default allusersingup