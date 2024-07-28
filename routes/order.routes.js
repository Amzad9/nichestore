import { Router } from "express";
import { orderSave } from "../controllers/order.controller.js";

const orderRoutes = Router();

orderRoutes.route("/order").post(orderSave)

export default orderRoutes