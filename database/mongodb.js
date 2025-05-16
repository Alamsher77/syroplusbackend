import mongoose from 'mongoose'
const mongodbconnection = async ()=>{
  try {
    /* code */
    await mongoose.connect(process.env.MONGO_DATA);
     console.log('db connection success !!')
  } catch (e) {
    console.log(e?.message)
  }
 
  
}
export default mongodbconnection