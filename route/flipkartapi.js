
import express from 'express'
import {allUserAuthe} from '../authmiddleware/index.js' 

const flipkartapp = express.Router()

import userfetch from '../controller/flipkart/userfetch.js'
flipkartapp.get('/userfetch',userfetch)

//  user login from  frontend
import alluserlogin from '../controller/authe/alluserlogin.js'

flipkartapp.post('/userlogin',alluserlogin)


export default flipkartapp