const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


//detail of each item
const ProductsCartSchema = mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "User"
    },
    name: String,
    count: Number,
    price: Number
});

const ProductCart = mongoose.model("ProductCart", ProductsCartSchema)


//individual cart item and its details
const OrderSchema = new mongoose.Schema(
    {
        products: [ProductsCartSchema], 
        transaction_id: {},
        amount: { type: Number },
        address: String,
        updated: Date,
        user: {
            type: ObjectId,
            ref: "User"
        }
    }, { timestamps: true }
);


const Order = mongoose.model("Order", OrderSchema)


module.exports = ProductCart{ Order, ProductCart }