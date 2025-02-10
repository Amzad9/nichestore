// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs"

// cloudinary.config({ 
//     cloud_name: 'dk3seqwmg', 
//     api_key: '642823594613213', 
//     api_secret: 'IZuTI8hzy_kgBtYl05cVawSM7M4' // Click 'View Credentials' below to copy your API secret
// });

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if(!localFilePath) return null
//      const uploadResult = await cloudinary.uploader.upload(
//           localFilePath, {
//             resource_type: 'auto',
//           }
//       )
//       fs.unlinkSync(localFilePath)
//       return uploadResult
//   } catch (error) {
//     console.log(error)
//     fs.unlinkSync(localFilePath)
//     return null
//   }
// }


// export {uploadOnCloudinary}

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier"; // ✅ Required for buffer upload

dotenv.config();

// 🔹 Configure Cloudinary
cloudinary.config({
    cloud_name: 'dk3seqwmg', 
    api_key: '642823594613213', 
    api_secret: 'IZuTI8hzy_kgBtYl05cVawSM7M4'
});

// 🔹 Upload Function (Accepts Buffers Instead of File Paths)
const uploadOnCloudinary = async (fileBuffer, fileOriginalName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", public_id: fileOriginalName },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject("Cloudinary upload failed");
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export { uploadOnCloudinary };