 import alluserModel from '../../models/allusermodel.js';
import Otp from '../../models/otp.js';
import bcrypt from 'bcryptjs'
const updateloginpassword = async (req, res) => {
  const { otp, password, rePassword } = req.body;
  // Validate the request body
  console.log(req.body);
  try {
    // Check if the userId is provided
    if (!otp || !password || !rePassword) {
      return res.json({ message: 'Please provide userId, otp, password, and rePassword', success: false });
    }

    if (password !== rePassword) {
      return res.json({ message: 'Passwords do not match', success: false });
    }

    const otpRecord = await Otp.findOne({ otp });
    // Check if the OTP is valid
    if (!otpRecord) {
      return res.json({ message: 'Invalid OTP', success: false });
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    
    const user = await alluserModel.findByIdAndUpdate({_id:req.userId.userId},{$set:{password:hashPassword}},{new:true});
    if(!user){
     return res.json({message:'Password Updated Faild',success:false})

    }
    res.json({ message: 'Password updated successfully', success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}
export default updateloginpassword;