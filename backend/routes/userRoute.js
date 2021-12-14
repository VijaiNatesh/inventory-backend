var ObjectId = require('mongodb').ObjectID
const express = require('express')
const userRoute = express.Router()
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const Bill = require("../models/Bill")
const authTokenGenerator = require('../utlis/generateToken');
const asyncHandler = require('express-async-handler')


userRoute.post('/userregister', asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email: email })
    if (userExist) {
        throw new Error('User Exist')
    }
    const user = await User.create({ name, email, password })
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token: authTokenGenerator(user._id),
    })
}))

userRoute.post('/login', asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (user && (await user.isPasswordMatch(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: authTokenGenerator(user._id),
        })
    }
    else {
        throw new Error('Invalid login credentials');
    }
}))

userRoute.get('/profile/:id', asyncHandler(async (req, res) => {
    const profile = await User.findById(req.params.id).populate('purchase', 'itemName productKey quantity unitCost unitPrice', Purchase)
    res.json(profile)
}))

userRoute.get('/bill/:id', asyncHandler(async (req, res) => {
    const bill = await User.aggregate([
        {
            $match: {
                _id: new ObjectId(req.params.id)
            }
        },
        {
            $lookup:
                {
                    from: "bills",
                    localField: "_id",
                    foreignField: "createdBy",
                    as: "bill"
                }
        },
        {
            $unwind: "$bill"
        },
        {

            $addFields:
                {
                    "billProductKey": "$bill.productKey",
                    "billQuantity": "$bill.quantity"
                }
        },
        {
            $lookup:
                {
                    from: "purchases",
                    localField: "billProductKey",
                    foreignField: "productKey",
                    as: "purchase"
                }
        },
        {
            $unwind: "$purchase"
        },
        {

            $addFields:
                {
                    "purchaseItemName": "$purchase.itemName",
                    "purchaseUnitPrice": "$purchase.unitPrice",
                    "purchaseQuantity": "$purchase.quantity",
                    "purchaseProductKey": "$purchase.productKey",
                    "purchaseUnitCost" : "$purchase.unitCost"
                }
        },
        {
            $project:
            {
                purchaseItemName: 1,
                billProductKey: 1,
                billQuantity: 1,
                purchaseUnitPrice: 1,
                purchaseQuantity: 1,
                purchaseProductKey: 1,
                purchaseUnitCost: 1,
                availableQty: {
                    $subtract: ["$purchaseQuantity", "$billQuantity"]
                },
                total: {
                    $multiply: ["$billQuantity", "$purchaseUnitPrice"]
                }
            }
        }

    ])
    res.json(bill)
}))


module.exports = userRoute


