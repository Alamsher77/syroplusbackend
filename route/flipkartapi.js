
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


export default flipkartapp