import { Router } from "express";
import { orderSave, fetchOrder } from "../controllers/order.controller.js";

const orderRoutes = Router();

orderRoutes.route("/order").post(orderSave)
orderRoutes.route("/order").get(fetchOrder)

export default orderRoutes