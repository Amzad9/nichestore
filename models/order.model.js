import mongoose from "mongoose";

const ProductSubSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', required: true
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
});

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user" 
    },
    products: {
        type: [ProductSubSchema],
        required: true
    },
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    paymentMethod: String,
    totalPrice: Number,
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date, default: null },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
})

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;