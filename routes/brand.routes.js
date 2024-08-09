import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { createBrand, fetchBrand, fetchBrandById, deletebrand, updateBrand } from "../controllers/brand.controller.js";

const brandRoutes = Router();
brandRoutes.route("/brand").post(upload.fields([{ name: 'image', maxCount: 1 }]),createBrand)
brandRoutes.route("/brand").get(fetchBrand)
brandRoutes.route("/brand/:id").get(fetchBrandById)
brandRoutes.route("/brand/:id").delete(deletebrand)
brandRoutes.route("/brand/:id").patch(upload.fields([{ name: 'image', maxCount: 1 }]),updateBrand)


export default brandRoutes;