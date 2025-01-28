import mongoose from "mongoose";

const ProductSubSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      title: {
        type: String
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1'],
      },
      image: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative'],
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
    totalPrice: Number,
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    paymentMethod: String,
    status: String,
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date, default: null },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
})

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;