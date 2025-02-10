import express from "express";
import { createBrand, fetchBrand, fetchBrandById, deletebrand, updateBrand } from "../controllers/brand.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const brandRoutes = express.Router();

brandRoutes.route("/brand").post(upload.single("image"), createBrand);
brandRoutes.route("/brand").get(fetchBrand);
brandRoutes.route("/brand/:id").get(fetchBrandById);
brandRoutes.route("/brand/:id").delete(deletebrand);
brandRoutes.route("/brand/:id").patch(upload.single("image"), updateBrand);

export default brandRoutes;
