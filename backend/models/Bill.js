const mongoose = require('mongoose')
const conn = mongoose.createConnection("mongodb+srv://vijay:vijay123123@cluster0.76a7k.mongodb.net/inventory-bill-app");
const Purchase = require('../models/Purchase')

const BillSchema = new mongoose.Schema({ 
    billNo:{
        type:Number,
        required: true
    },   
    productKey: {
        type: String,           
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,       
        default: Date.now
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


const Bill = conn.model('Bill', BillSchema)

module.exports = Bill
