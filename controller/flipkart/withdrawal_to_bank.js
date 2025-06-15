import mongoose from "mongoose";
import Withdrawal from "../../models/withdrawal.js";
import alluserModel from "../../models/allusermodel.js";
 
const withdrawalToBank = async (req, res) => {
  const { bankdetails, amount} = req.body;


  try { 

    // Check if the userId is provided
    if (!bankdetails) {
      res.json({ message: "Please select your bank", success: false });
      return;
    } 
   
    const currentDate = new Date(); 
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const result = weekdays[currentDate.getDay()];
 
    if(!result === "Monday"  || !result === "Wednesday" || !result === "Friday"  ) {
        res.status(200).json({ message: "Withdrawal is only allowed on Mondays, Wednesdays, and Fridays", success: false });
        return;
    } 
         
    const getwithdrawaldata = await Withdrawal.findOne({ userId: req.userId.userId })
    const getwithdrawaldate = getwithdrawaldata?.createdAt;
   
    const timeDifference = currentDate - getwithdrawaldate;
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    if (getwithdrawaldata && timeDifference < oneDay) {
      // If the withdrawal request is less than 24 hours old, return an error
      res.status(200).json({ message: "only one withdrawal request is allowed within 24 hours", success: false });
      return;
    }

    const actualWithdrawalAmount = amount - (amount * 0.06); // 6% fee


    const withdrawal = new Withdrawal({
      bankdetails:{accountNumber:bankdetails.accountNumber,name:bankdetails.name,bankName:bankdetails.bankName,ifscCode:bankdetails.ifscCode},
      amount,
      withdrawalAmount: actualWithdrawalAmount,
      userId:req.userId.userId    
    });
    // Save the withdrawal request to the database
    const user = await alluserModel.findOneAndUpdate({_id:req.userId.userId},{$inc:{wallet:-amount,total_withdrawal_amount:amount}},{new:true});
    await withdrawal.save();   
    res.status(201).json({ message: "Withdrawal request created successfully",success:true });
  } catch (error) {
    res.json({ message:error.message,success:false});
  }
};

const allWithdrawalHistory = async (req, res) => {
  try {
    const withdrawalHistory = await Withdrawal.find({ userId: req.userId.userId })
    console.log(withdrawalHistory);
    res.json({
      success: true,
      message: "Withdrawal history fetched successfully",
      data: withdrawalHistory
    });
  } catch (error) {
    res.json({success:false, message: error.message });
  }
};
export { withdrawalToBank, allWithdrawalHistory };
