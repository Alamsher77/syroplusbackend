import all_type_transaction_model from '../models/all_type_transaction.js'
const all_type_transaction_method = async({...data})=>{
  try { 
   const createTransaction = new all_type_transaction_model({
     ...data
   })
 console.log(createTransaction)
  await createTransaction.save()
  } catch (e) {
    console.log('transaction error',e.message)
  }
 
}

export default all_type_transaction_method