import { Router } from "express";
import { createBrand, fetchBrand, fetchBrandById, deletebrand, updateBrand } from "../controllers/brand.controller.js";

const brandRoutes = Router();
brandRoutes.route("/brand").post(createBrand)
brandRoutes.route("/brand").get(fetchBrand)
brandRoutes.route("/brand/:id").get(fetchBrandById)
brandRoutes.route("/brand/:id").delete(deletebrand)
brandRoutes.route("/brand/:id").patch(updateBrand)


export default brandRoutes;