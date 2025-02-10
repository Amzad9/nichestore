import { Router } from "express";
import {productCreate, fetchProducts,fetchProductById,updateProduct,productDeleteById} from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const productRoutes = Router();
productRoutes.route("/product").post(upload.single("image"),productCreate)
productRoutes.route("/product").get(fetchProducts);
productRoutes.route("/product/:id").get(fetchProductById);
productRoutes.route("/product/:id").delete(productDeleteById);
productRoutes.route("/product/:id").patch(upload.single("image"),updateProduct);

export default productRoutes
