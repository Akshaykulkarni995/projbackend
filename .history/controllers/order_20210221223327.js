const { Order, ProductCart } = require("../models/order")

exports.getOrderById = (req,res,next,id) => {

    Order.findById(id)
    .populate("products")
    .exec((err,order) => {
        if(err){
            return res.status(400).json({
                error : "No order found in db"
            })
        }
        req.order = order;
        next();
    });
};