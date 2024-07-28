import { Router } from "express";
import {productCreate, fetchProducts} from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const productRoutes = Router();
productRoutes.route("/product").post(upload.fields([{name: 'image', maxCount: 1}]),productCreate)
productRoutes.route("/product").get(fetchProducts);

export default productRoutes
