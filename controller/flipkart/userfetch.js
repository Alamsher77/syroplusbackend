import alluserModel from '../../models/allusermodel.js'
import jwt from 'jsonwebtoken'
const userfetch = async (req,res)=>{
  try {
    /* code */
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token,process.env.All_COOKIES_DATA);
    const getuserdata = await alluserModel.findOne({_id:decoded?.userId})
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