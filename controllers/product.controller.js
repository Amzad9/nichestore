import productModel from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const productCreate = asyncHandler(async(req, res) => {
    try {
        console.log(req.body)
        const {
            title,
            description,
            price,
            category,
            subcategory,
            brand,
            stock,
            rating,
            reviews
        } = req.body;
       
        const requiredFields = [
            'title',
            'description',
            'price',
            'category',
            'subcategory',
            'brand',
            'stock'
            ];
        const missingFields = requiredFields.filter(field => !Object.hasOwn(req.body, field));
    
        if (missingFields.length > 0) {
          return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        const imagePath = req.files?.image[0].path;
        if(!imagePath || !req.files){
            return res.status(400).json({ message: "No image uploaded" });
        }
        const imageurl = await uploadOnCloudinary(imagePath);
        let parsedReviews = [];

        if (reviews) {
            try {
                parsedReviews = JSON.parse(reviews);
            } catch (error) {
                return res.status(400).json({ message: "Invalid reviews format" });
            }
        }

        const product = await productModel.create({
            title,
            description,
            price,
            image: imageurl.url,
            category: category,
            subcategory: subcategory,
            brand: brand,
            stock,
            rating,
            reviews : parsedReviews
        });
    
        return res.status(201).json({ message: 'Product created successfully', product });
      } catch (error) {
        console.error('Error creating product:', error); // Log the error for debugging
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
})

const fetchProducts = asyncHandler(async(req, res) => {
try {
  const products = await productModel.find()
  .populate('category')
  .populate('subcategory')
  .populate('brand')
  .populate('reviews');
  return res.status(200).json({ products,  message: "fetched products successfully." });
} catch (error) {
  return res.status(500).json({ message: "internal server error" });
}
})

export  {productCreate , fetchProducts}