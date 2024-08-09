import { Router } from "express";
import { 
    createMaterial, 
    materialList, 
    meterialDeleteById, 
    fetchMaterialById, 
    updateMeterial 
} from "../controllers/material.controller.js";
import { upload } from "../middleware/multer.middleware.js";


const meterialRoutes = Router();

meterialRoutes.route("/meterial").post(upload.fields([{ name: 'image', maxCount: 1 }]),createMaterial);
meterialRoutes.route("/meterial").get(materialList);
meterialRoutes.route("/meterial/:id").get(fetchMaterialById);
meterialRoutes.route("/meterial/:id").delete(meterialDeleteById);
meterialRoutes.route("/meterial/:id").patch(upload.fields([{ name: 'image', maxCount: 1 }]),updateMeterial);


export default meterialRoutes;