import { Router } from "express";
import { 
    createMaterial, 
    materialList, 
    meterialDeleteById, 
    fetchMaterialById, 
    updateMeterial 
} from "../controllers/material.controller.js";
meterialDeleteById
const meterialRoutes = Router();

meterialRoutes.route("/meterial").post(createMaterial);
meterialRoutes.route("/meterial").get(materialList);
meterialRoutes.route("/meterial/:id").get(fetchMaterialById);
meterialRoutes.route("/meterial/:id").delete(meterialDeleteById);
meterialRoutes.route("/meterial/:id").patch(updateMeterial);


export default meterialRoutes;