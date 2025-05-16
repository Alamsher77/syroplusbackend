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
app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
app.use(express.static(path.join(__dirname, 'public')));

app.set('layout', 'layouts/main');
app.use(cookieParser())
app.use('/authe',autheroute);
app.use('/api',flipkartapp);
app.use('/admin-invest',isLoggedIn,adminpannelroute);
// api/index.js

app.use((req, res, next) => {
  res.locals.user = null; // ✅ default value (replace with actual user when available)
  next();
});

app.get('/',(req, res) => {
  res.status(200).render('index')
});


app.use((req,res)=>{
  
  res.status(404).render('404',{layout:false})
})

// app.use((err, req, res, next) => {
//   console.log('Render Error:', err.message);
  
//   res.status(500).render('error', {
//     message: 'Something went wrong in the template!',
//     error: true ? err : {}
//   });
// });

app.use((err, req, res, next) => {
  res.status(500).send(`<pre>${err.stack}</pre>`);
});



mongodbconnection().then(()=>{
  app.listen(3000, () => {
  console.log('Server running on port 3000');
});
})

 
