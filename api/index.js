import express from 'express';
const app = express();
import path from 'path';
import expressLayouts from'express-ejs-layouts';
import autheroute from '../route/autheroute.js'
import adminpannelroute from '../route/adminpannelroute.js'
import flipkartapp from '../route/flipkartapi.js'
import {isLoggedIn} from '../authmiddleware/index.js'
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import dotenv  from "dotenv";
import mongodbconnection from '../database/mongodb.js';
import flash from 'express-flash';
import session from 'express-session'
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
 app.set('views', path.join(__dirname, '../views'));
app.use(express.json())
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
// Optional: set the layout file name (default is 'layout.ejs')
dotenv.config()
app.use(session({
    secret: process.env.FLASH_ID,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(express.static(path.join(__dirname, '../public')));

app.set('layout', 'layouts/main');
app.use(cookieParser())
app.use('/authe',autheroute);
app.use('/api',flipkartapp);
app.use('/admin-invest',adminpannelroute);
// api/index.js

app.use((req, res, next) => {
  res.locals.user = null; // ✅ default value (replace with actual user when available)
  next();
});

app.get('/',(req, res) => {
  res.status(200).send('Server running')
});

import alluserModel from '../models/allusermodel.js'
import cron from "node-cron"
import create_perchase_product_model from "../models/create_perchase_product_model.js"
import all_type_transaction_method from '../controller/all_type_transaction.js'
cron.schedule('0 3 * * *', async () => {
  
  try {
    const investments = await create_perchase_product_model.find({ status: "incomplete" });

    for (let inv of investments) {

      if (inv.totalcount >= inv.incomeperiod) {
        if(inv.totalcount == inv.incomeperiod){
          console.log('count completed',inv.totalcount)
          inv.status = "complete";
       await alluserModel.updateMany({_id:inv.userId}, { $inc: { wallet: inv.price,total_withdrawal:inv.price } });
          inv.availbleObtain = 0
        }
      } else {
         
        inv.currentObtain += inv.dailyincome;
        inv.availbleObtain -= inv.dailyincome;
        inv.totalcount += 1
        console.log('count not completed',inv.totalcount)
        const wallet = await alluserModel.findOne({_id: inv.userId });
        if (wallet) {
          wallet.wallet += inv.dailyincome;
          wallet.total_income += inv.dailyincome
          wallet.today_income += inv.dailyincome
          wallet.total_obtain += inv.dailyincome
          wallet.total_withdrawal += inv.dailyincome
        
  all_type_transaction_method({transaction_amount:inv.dailyincome,userId:inv.userId,transaction_type:'product',name:inv.name,categary:inv.categary})
    await wallet.save();
        }
      } 
     await inv.save();
    } 
    console.log("✅ Investments and Wallets updated.");
  } catch (err) {
  console.log('Cron Error',err.message)
  }
});

cron.schedule('0 0 * * *', async () => { 
  try { 
    // Reset all todayEarne to 0 after updating
    await alluserModel.updateMany({}, { $set: { today_income: 0 } }); 
  } catch (err) {
    console.log('❌ Cron Error:',err.messag)
  }
});

app.use((req,res)=>{ 
  res.status(404).render('404',{layout:false})
})

 
app.use((err, req, res, next) => {
  res.status(500).send(`<pre>${err.stack}</pre>`); 
});



mongodbconnection().then(()=>{
  app.listen(3000, () => {
  console.log('Server running on port 3000');
});
})

 
