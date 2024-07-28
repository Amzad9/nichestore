import { Router } from "express";
import { userLogin, userList, userRegister, resetPassword, forgotPassword } from "../controllers/admin.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../middleware/multer.middleware.js";
const adminRoutes = Router();

adminRoutes.route("/admin").post(upload.fields([{ name: 'avatar', maxCount: 1 }]),userRegister)
adminRoutes.route("/adminlogin").post(userLogin)
adminRoutes.route("/userlist").get(verifyToken,userList)
adminRoutes.route("/resetPassword").post(resetPassword)
adminRoutes.route("/forgotPassword").post(forgotPassword)


export default adminRoutes