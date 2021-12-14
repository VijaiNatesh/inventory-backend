const express = require('express')
const billRoute = express.Router();
const  Bill = require('../models/Bill');
const asyncHandler = require("express-async-handler")
const Purchase = require('../models/Purchase')


billRoute.post('/', asyncHandler(async(req,res) => {
   try{
    const {billNo, productKey, quantity, createdBy} = req.body;
    const billList = await Bill.create({billNo, productKey, quantity, createdBy})
    res.status(200)   
    res.send(billList)
   }
   catch(error){
       res.status(500)
       console.log(error)
   }
}))

billRoute.delete('/:id', asyncHandler(async(req,res) => {
    const bill = await Bill.findByIdAndDelete(req.params.id)
    res.send(bill)
}))









module.exports = billRoute