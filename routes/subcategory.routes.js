import { Router } from "express";
import { createSubCategory, subcategoryList,fetchSubCategoryById,subcategoryDeleteById , updateSubCategory} from "../controllers/subCategory.controller.js";

const subCaregoryRoutes = Router();

subCaregoryRoutes.route('/subcategory').post(createSubCategory);
subCaregoryRoutes.route('/subcategory').get(subcategoryList);
subCaregoryRoutes.route('/subcategory/:id').get(fetchSubCategoryById);
subCaregoryRoutes.route('/subcategory/:id').delete(subcategoryDeleteById);
subCaregoryRoutes.route('/subcategory/:id').patch(updateSubCategory);



export default subCaregoryRoutes