
import express from 'express'
import {flipkartauthe} from '../authmiddleware/index.js' 

const flipkartapp = express.Router()

import userfetch from '../controller/flipkart/userfetch.js'
flipkartapp.get('/userfetch',flipkartauthe,userfetch)

//  user login from  frontend
import alluserlogin from '../controller/authe/alluserlogin.js'

// flipkartapp.post('/userlogin',flipkartauthe,alluserlogin)
flipkartapp.post('/userlogin',alluserlogin)

// user product fetch 
import investproductfetch from '../controller/flipkart/invest_product_fetch.js'

flipkartapp.get('/investproduct',flipkartauthe,investproductfetch)

//   existing user create_perchase_product
import create_perchase_product from '../controller/flipkart/create_perchase_product.js'
flipkartapp.post('/create_perchase_product',flipkartauthe,create_perchase_product)
import create_perchase_product_fetch from '../controller/flipkart/create_perchase_product_fetch.js'
flipkartapp.get('/create_perchase_product_fetch',flipkartauthe,create_perchase_product_fetch)

// fet al trasaction history
import {fetch_all_transaction,fetch_all_transaction_product} from  '../controller/flipkart/fetch_all_transaction.js'
flipkartapp.get('/fetch_all_transaction',flipkartauthe,fetch_all_transaction)
flipkartapp.get('/fetch_all_transaction_product',flipkartauthe,fetch_all_transaction_product)

// fetch all recharge transacton 
import fetch_recharge_transaction from '../controller/flipkart/fetch_recharge_transaction.js'

flipkartapp.get('/fetch_recharge_transaction',flipkartauthe,fetch_recharge_transaction)

// convert_to_withdrawal_wallete route
import convert_to_withdrawal_wallete from '../controller/flipkart/convert_to_withdrawal_wallete.js'
flipkartapp.post('/convert_to_withdrawal_wallete',flipkartauthe,convert_to_withdrawal_wallete)

// add bank details or fetch bank details
import {add_bank_account_details,fetch_bank_account_details} from '../controller/flipkart/add_bank_account_details.js'
flipkartapp.post('/add_bank_account_details',flipkartauthe,add_bank_account_details)

flipkartapp.get('/fetch_bank_account_details',flipkartauthe,fetch_bank_account_details)

// withdrawal password create or update
import {create_withdrawal_password,update_withdrawal_password} from '../controller/flipkart/create_or_update_withdrawal_password.js'
flipkartapp.post('/create_withdrawal_password',flipkartauthe,create_withdrawal_password)
flipkartapp.post('/update_withdrawal_password',flipkartauthe,update_withdrawal_password)

// withdrawal to bank
import {allWithdrawalHistory, withdrawalToBank} from '../controller/flipkart/withdrawal_to_bank.js'
flipkartapp.post('/withdrawal_to_bank',flipkartauthe,withdrawalToBank)

// fetch all withdrawal history
flipkartapp.get('/all_withdrawal_history',flipkartauthe,allWithdrawalHistory);

// update login password
import generateOtp from '../controller/flipkart/send_otp.js'
flipkartapp.post('/send_login_password_otp',flipkartauthe,generateOtp)
import updateloginpassword from '../controller/flipkart/update_login_password.js'
flipkartapp.post('/update_login_password',flipkartauthe,updateloginpassword)
export default flipkartapp