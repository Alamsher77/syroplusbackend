import mongoose from 'mongoose'
import alluserModel from '../../models/allusermodel.js'
import isValidPhoneNumber from '../../validatenumber.js'
import bcrypt from 'bcryptjs'
const allusersingup = async(req,res)=>{
  const {...users} = req.body 
  try { 
    const numbervalidate = isValidPhoneNumber(users.phone)
    if(!numbervalidate){
     if(users?.web == 'web'){
     req.flash('error','Please enter the valid number');
      res.redirect(`/authe/alluser${!users?.whoinvitecode ? "":"?id="+users?.whoinvitecode}`);
      }else{
    res.json({
      success:false,
      message:'Please enter the valid number'
    })
  }
      return  false
    }
    
    if(users?.confirmPassword !== users?.password){
       if(users?.web == 'web'){
     req.flash('error','password or confirmPassword note match');
      res.redirect(`/authe/alluser${!users?.whoinvitecode ? "":"?id="+users?.whoinvitecode}`);
      }else{
    res.json({
      success:false,
      message:'password or confirmPassword note matchr'
    })
  }
      return  false
    } 
  const alradyusrs = await alluserModel.findOne({phone:users.phone})
 
    if(alradyusrs){
       if(users?.web == 'web'){
     req.flash('error','User alrady account created');
      res.redirect(`/authe/alluser${!users?.whoinvitecode ? "":"?id="+users?.whoinvitecode}`);
      }else{
    res.json({
      success:false,
      message:'User alrady account created'
    })
  }
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
    })
 
    console.log(newusers)
    await newusers.save()
      if(users?.web == 'web'){
     req.flash('success','Users Created SuccessFull') 
     res.redirect(`/authe/download`) 
      }else{
    res.json({
      success:true,
      message:'Users Created SuccessFull'
    })
  } 
  } catch (e) {
     if(users?.web == 'web'){
     req.flash('error',e.message);
      res.redirect(`/authe/alluser${!users?.whoinvitecode ? "":"?id="+users?.whoinvitecode}`);
      }else{
    res.json({
      success:false,
      message:e.message
    })
  }
  }
}

export default allusersingup