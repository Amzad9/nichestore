import { Router } from "express";
import { cartCreate, fetchCart, fetchCartByID, updateCartItemQuantity } from "../controllers/cart.controller.js";

const cartRoutes = Router();
cartRoutes.route("/cart").post(cartCreate)
cartRoutes.route("/cart").get(fetchCart);
cartRoutes.route("/cart/:id").get(fetchCartByID);
cartRoutes.route("/cart/:id").patch(updateCartItemQuantity);

export default cartRoutes