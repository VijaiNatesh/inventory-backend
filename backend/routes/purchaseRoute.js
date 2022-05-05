const express = require('express')
const asyncHandler = require("express-async-handler")
const Purchase = require('../models/Purchase')
const User = require('../models/User')
const purchaseRoute = express.Router()


purchaseRoute.post('/additem', asyncHandler(async(req,res) => {
    try{        
        const {itemName, productKey, quantity, unitPrice, unitCost, createdBy} = req.body;
        const newItem = await Purchase.create({itemName, productKey, quantity, unitPrice, unitCost, createdBy});
       
    res.status(200)
    res.send(newItem)
    }
    catch(error){
        res.send(error); 
        console.log(error)           
    }
}))

purchaseRoute.put('/:id', asyncHandler(async (req, res) => {
    const updatedItems = await Purchase.findByIdAndUpdate(req.params.id, req.body)
    res.json(updatedItems)
}))

purchaseRoute.get('/:id', asyncHandler(async(req,res) => {
        const purchase = await Purchase.findById(req.params.id)
        res.json(purchase)
}))

purchaseRoute.delete('/:id', asyncHandler(async(req, res) => {
        const purchase = await Purchase.findByIdAndDelete(req.params.id)
        res.send(purchase)
}))







module.exports = purchaseRoute