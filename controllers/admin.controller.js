import md5 from 'md5';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js'
import Admin from './../models/admin.model.js'
import {uploadOnCloudinary} from  './../utils/cloudinary.js'


const userLogin = asyncHandler(async (req, res) => {
   try {
      const hashPassword = md5(req.body.password)
      const { contact, email } = req.body;

      if (!contact && !email) {
         return res.status(400).json({ message: 'contact and email are required' })
      }

      const userExits = await Admin.findOne({
         $or: [{ contact }, { email }]
      });

      if (!userExits) {
         return res.status(400).json({ message: "user does not Exits" });
      }

      if (hashPassword !== userExits.password) {
         return res.status(400).json({ message: 'password is incorrect' })
      }

      const token = jwt.sign(
         { id: userExits },
         process.env.JWT_SECRET,
         { expiresIn: "24h" }
      )

      res.cookie('auth_token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'Strict',
         maxAge: 24 * 60 * 60 * 1000,
      });
      req.session.user = userExits;
      return res.status(200).json({ user: userExits, token, message: "user successfully logined" })

   } catch (error) {
      return res.status(500).json({ message: "Login failled" })
   }
})


const userRegister = asyncHandler(async (req, res) => {
   try {
      const password = md5(req.body.password);
      const { firstName, lastName, email, contact } = req.body;

      if ([firstName, lastName, email, contact, password].some((field) => field.trim() == "")) {
         return res.status(400).json({ message: "All fields are required." })
      }

      const exitsUser = await Admin.findOne({
         $or: [{ contact }, { email }]
      })

      if (exitsUser) {
         return res.status(400).json({ message: "User already exists." })
      }

      const avatarLocalPath = req.files?.avatar[0].path;
      console.log({avatarLocalPath})

      if(!avatarLocalPath){
         return res.status(400).json({message: "Avatar file is required"});
      }

      const avatar = await uploadOnCloudinary(avatarLocalPath)
      console.log({avatar})

      const adminUser = await Admin.create({ firstName, lastName, email, avatar: avatar.url,  password, contact });

      const createdUser = await Admin.findById(adminUser._id)
      if (!createdUser) {
         return res.status(500).json({ message: "Something went wrong while registering the user" })

      }
      
      console.log({createdUser})
      return res.status(201).json({ createdUser, message : "user created sucessfully" });

   } catch (error) {
      return res.status(500).json({ message: "Login failled" })
   }
})


const userList = asyncHandler(async (req, res) => {
   try {
      
      const limit = parseInt(req.query.limit, 10) || 10;
      const page = parseInt(req.query.page, 10) || 1
      const skip = limit * (page - 1)
      console.log({ page, skip })

      const selectFields = "firstName lastName email contact createdAt";
      const userList = await Admin.find({}, selectFields)
         .sort({ createdAt: -1 })
         .limit(limit)
         .skip(skip)

      const totalRecords = await Admin.countDocuments();

      return res.status(200).json({ users: userList, totalRecords, message: "Users found successfully" });
   } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
   }
})

const resetPassword = asyncHandler(async (req, res) => {
   try {
      
      const {userId, currentPassword, newPassword} = req.body;
      const hashCurrentPassword = md5(currentPassword);
      const hashNewPassword = md5(newPassword);

      const user = await Admin.findById(userId);
      console.log(user)
      if(!user){
         res.status(400).json({message: "user not fount"})
      }
      if (hashCurrentPassword === hashNewPassword){
         res.status(400).json({message: "New password cannot be the same as the current password"})
      }

      if(hashCurrentPassword !== user.password){
         res.status(400).json({message: "Current password is incorrect"})
      }
      user.password = hashNewPassword
      await user.save();
      res.status(200).json({message: "password changed successfully"})
   } catch (error) {
      console.log(error)
   }
})


const forgotPassword = asyncHandler(async (req, res) => {
   try {
      const {email, newPassword} = req.body
      const hashNewPassword = md5(newPassword);
      const user = await Admin.findOne({email});
      console.log(user)
      if(!user){
         res.status(400).json({message: "user not fount"})
      }
      user.password = hashNewPassword
      await user.save();
      return  res.status(200).json({message:"forgot password successfully"})
   } catch (error) {
      return res.status(500).json({message:"internal server error"})
   }
})

// User logout function
const userLogout = asyncHandler(async (req, res) => {
   try {
      // Destroy the session
      req.session.destroy((err) => {
         if (err) {
            return res.status(500).json({ message: 'Could not log out' });
         }
         // Clear the JWT cookie
         res.clearCookie('auth_token'); 
         return res.status(200).json({ message: 'Logged out successfully' });
      });
   } catch (error) {
      return res.status(500).json({ message: 'Internal server error during logout' });
   }
});
const checkSession = asyncHandler(async (req, res) => {
try {
   console.log("req.session", req.session.user)
    if (req.session && req.session.user) {
console.log("req.session.user", req.session.user)
       return res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
       return res.status(401).json({ loggedIn: false });
    }
} catch (error) {
   return res.status(500).json({ message: 'Internal server error' })
}
});

export { userRegister, userLogin, userList, resetPassword, forgotPassword, userLogout, checkSession }