import { Router } from "express";
import {createCategories, categoryList, getCategoryById, categoryDeleteById, updateCategoryById} from "../controllers/category.controller.js";
import { upload } from "./../middleware/multer.middleware.js"
import multer from "multer";

const categoryRoutes = Router();



categoryRoutes.route("/category").post(upload.fields([{name: 'image', maxCount: 1}]),createCategories);
categoryRoutes.route("/category").get(categoryList);
categoryRoutes.route("/category/:id").get(getCategoryById);
categoryRoutes.route("/category/:id").delete(categoryDeleteById);
categoryRoutes.route("/category/:id").patch(upload.fields([{name: 'image', maxCount: 1}]),updateCategoryById);

// Error handling middleware for multer
categoryRoutes.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: "File size is too large. Maximum limit is 2MB." });
      }
    } else if (err) {
      // An unknown error occurred when uploading.
      if (err.message === "Only images are allowed") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(400).json({ message: err.message });
    }
    // If no errors, continue to the next middleware
    next();
  });

export default categoryRoutes;