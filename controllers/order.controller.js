import orderModel from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const orderSave = asyncHandler(async (req, res) => {
  try {
    const { userId, products, shippingAddress, paymentMethod, totalPrice, status } = req.body;
    console.log({userId, products, shippingAddress, paymentMethod, totalPrice, status})
    // Using create to both instantiate and save the order in one step
    const saveOrder = await orderModel.create({
      userId, 
      products, 
      shippingAddress, 
      paymentMethod, 
      totalPrice, 
      status
    });

    console.log({ saveOrder });
    return res.status(201).json({ payload: saveOrder, message: "Order saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error occurred" });
  }
});


const fetchOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await orderModel.find({}, 'userId products totalPrice shippingAddress paymentMethod status');
    
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }

    return res.status(200).json({ payload: orders, message: "Fetched orders successfully" });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: "Error fetching orders." });
  }
});

export {orderSave, fetchOrder}