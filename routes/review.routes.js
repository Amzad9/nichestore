import { Router } from "express"
import { createReview } from "../controllers/review.controller.js";

const reviewRoutes = Router();

reviewRoutes.route("/review").post(createReview);
// productRoutes.route("/product").get();
// productRoutes.route("/product/:id").get();
// productRoutes.route("/product/:id").delete();
// productRoutes.route("/product/:id").patch();


export default reviewRoutes;