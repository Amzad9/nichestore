import orderModel from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const orderSave = asyncHandler(async (req, res) => {
  try {
    const {userId, products, shippingAddress, paymentMethod,totalPrice} = req.body;
    const newOrder = new orderModel({
        userId, products, shippingAddress, paymentMethod,totalPrice
    })
   const saveOrder =  await newOrder.save();
   return res.status(201).json({orderItem:saveOrder, message: "Order Save successfully"});
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
});

export {orderSave}