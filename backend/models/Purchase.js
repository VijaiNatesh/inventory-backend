const mongoose = require('mongoose')
const conn = mongoose.createConnection(process.env.MONGO_URL)

const PurchaseSchema = new mongoose.Schema({
    itemName: {
        type: String,
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
    unitCost: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },    
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',        
        required: true
    }
})







const Purchase = conn.model("Purchase", PurchaseSchema)

module.exports = Purchase