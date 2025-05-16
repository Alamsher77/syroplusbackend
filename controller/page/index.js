
const index = async(req,res)=>{
  const arr = ['almahser ansari','samsher ansari','mojahid ansari']
  try {
    /* code */ 
     
    res.render('index',{user:req.userId})
  } catch (e) {
    
    console.log(e.message)
  }

}

export default index