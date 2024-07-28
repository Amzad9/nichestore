import { Router } from "express";
import {createCategories, categoryList, getCategoryById, categoryDeleteById, updateCategoryById} from "../controllers/category.controller.js";
import { upload } from "./../middleware/multer.middleware.js"

const categoryRoutes = Router();

categoryRoutes.route("/category").post(upload.fields([{name: 'image', maxCount: 1}]),createCategories);
categoryRoutes.route("/category").get(categoryList);
categoryRoutes.route("/category/:id").get(getCategoryById);
categoryRoutes.route("/category/:id").delete(categoryDeleteById);
categoryRoutes.route("/category/:id").patch(upload.fields([{name: 'image', maxCount: 1}]),updateCategoryById);


export default categoryRoutes;