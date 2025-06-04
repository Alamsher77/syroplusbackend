import bankdetailsModel from '../../models/bank_details.js'
const add_bank_account_details = async (req,res)=>{
  try {
     const {...data} = req.body
     if (!data.accountNumber || !data.conformAccountNumber || !data.name || !data.bankName) {
        res.json({
         success:false,
         message:"field require"
       })
       return  false 
     }
     if (data.conformAccountNumber != data.accountNumber) {
       res.json({
         success:false,
         message:'Account number note match to Conform Account number'
       })
       return  false
     }
     const availableacount = await bankdetailsModel.findOne({accountNumber:data.accountNumber})
     if (availableacount) {
       res.json({
         success:false,
         message:'This account already added'
       })
       return false
     }
      const bankdetails = new bankdetailsModel({ 
        userId:req.userId.userId,
        ...data
      })
       
      await bankdetails.save()
      console.log(bankdetails)
      res.json({
        success:true,
        message:'Account Details Added Successfully'
      })
  } catch (e) { 
    res.json({
    success:false,
    message:e.message
  })
  }
  
}

const fetch_bank_account_details = async(req,res)=>{
  try {
      const getdetails_of_bank = await bankdetailsModel.find({userId:req.userId.userId})
  
  console.log(getdetails_of_bank)
  if(!getdetails_of_bank){
    res.json({
      success:false,
      message:'faild to get bank details'
    })
    return false
  }
  
  res.json(getdetails_of_bank)
  } catch (e) {
    res.json({
      success:false,
      message:e.message
    })
  }
 
  
}

export  {add_bank_account_details,fetch_bank_account_details}