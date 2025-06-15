 
import Otp from "../../models/otp.js"; 

const generateOtp = async (req, res) => {
    try {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

        const createdOtp = await Otp.create({
            otp: generatedOtp
        });
        console.log(createdOtp);
        res.json({ message: "OTP generated successfully", otp: generatedOtp, success: true });
        await createdOtp.save();
    } catch (error) {

        console.error("Error generating OTP:", error);
        res.json({ message:error.message, success: false });
    }


}

export default generateOtp;