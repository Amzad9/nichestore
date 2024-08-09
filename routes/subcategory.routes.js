import { Router } from "express";
import { createSubCategory, subcategoryList,fetchSubCategoryById,subcategoryDeleteById , updateSubCategory} from "../controllers/subCategory.controller.js";
import { upload } from "./../middleware/multer.middleware.js"
import multer from "multer";

const subCaregoryRoutes = Router();

subCaregoryRoutes.route('/subcategory').post(upload.fields([{name: 'image', maxCount: 1}]),createSubCategory);
subCaregoryRoutes.route('/subcategory').get(subcategoryList);
subCaregoryRoutes.route('/subcategory/:id').get(fetchSubCategoryById);
subCaregoryRoutes.route('/subcategory/:id').delete(subcategoryDeleteById);
subCaregoryRoutes.route('/subcategory/:id').patch(upload.fields([{name: 'image', maxCount: 1}]),updateSubCategory);



export default subCaregoryRoutes