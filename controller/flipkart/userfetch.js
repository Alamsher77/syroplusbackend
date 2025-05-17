import alluserModel from '../../models/allusermodel.js'
import jwt from 'jsonwebtoken'
const userfetch = async (req,res)=>{
  try {
    /* code */ 
    const getuserdata = await alluserModel.findOne({_id:req.userId.userId})

    if(!getuserdata){
      res.json({
        success:false,
        message:'user fetch not found'
      })
      return  false
    }
    res.json({getuserdata,success:true})
  } catch (e) {
    res.json({
      success:false,
      message:e.message
    })
  }

}

export default userfetch