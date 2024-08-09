import productModel from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const productCreate = asyncHandler(async (req, res) => {
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
    if (!imagePath || !req.files) {
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
      reviews: parsedReviews
    });

    return res.status(201).json({ payload: product, message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error); // Log the error for debugging
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
})

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const products = await productModel.find().populate('category subcategory brand reviews');
    return res.status(200).json({ payload: products, message: "fetched products successfully." });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
})

const fetchProductById = asyncHandler(async(req, res) => {
  try {
   const id = req.params.id;
   const proId = await subCategortModel.findById(id);
   console.log(proId)

   if(!proId){
       return res.status(404).json({message: "Product id not found."})
   }
   return res.status(200).json({ data: subcategory, message: "fetch Product successfully"})
  } catch (error) {
   return res.status(500).json({ message: "Internal server error"})
  }
})

const productDeleteById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "product not found." })
    }
    return res.status(200).json({ message: "product deleted successfully." })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" })
  }
})

// const updateProduct = asyncHandler(async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { title, description, price,category,subcategory,brand,stock,rating,reviews } = req.body;
//     const proId = await productModel.findById(id);
   

//     if (!proId._id) {
//       return res.status(404).json({ message: "product id not found." })
//     }
//     console.log(proId._id)
//     const imageUrl = req.files?.image[0].path;

//     if (!imageUrl) {
//       return res.status(400).json({ message: "Please upload an image." });
//     }
   
//     let imagePath;
//     try {
//       imagePath = await uploadOnCloudinary(imageUrl);
//     } catch (uploadError) {
//       return res.status(500).json({ message: "Image upload failed", error: uploadError.message });
//     }
//     let parsedReviews = [];
   

//     if (reviews) {
//       try {
//         parsedReviews = JSON.parse(reviews);
//       } catch (error) {
//         return res.status(400).json({ message: "Invalid reviews format" });
//       }
//     }
//     console.log(proId._id)
//     const updateData = {
//       title, description, price, category, subcategory, brand, stock, rating, reviews: parsedReviews
//     };
//     const updatedProduct = await productModel.findByIdAndUpdate(proId._id, updateData,{ new: true });
   
//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found." })
//     }
//     return res.status(200).json({ payload: updatedProduct, message: "Product updated successfully." });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// })

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, price, category, subcategory, brand, stock, rating, reviews } = req.body;
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    const proId = await productModel.findById(id);
    console.log("Found Product:", proId);

    if (!proId._id) {
      return res.status(404).json({ message: "Product id not found." });
    }

    const imageUrl = req.files?.image?.[0]?.path;
    console.log("Image URL:", imageUrl);

    if (!imageUrl) {
      return res.status(400).json({ message: "Please upload an image." });
    }

    let imagePath;
    try {
      imagePath = await uploadOnCloudinary(imageUrl);
      console.log("Uploaded Image Path:", imagePath);
    } catch (uploadError) {
      return res.status(500).json({ message: "Image upload failed", error: uploadError.message });
    }

    let parsedReviews = [];
    if (reviews) {
      try {
        parsedReviews = JSON.parse(reviews);
      } catch (error) {
        return res.status(400).json({ message: "Invalid reviews format" });
      }
    }
    
    const updateData = {
      title, description, price, image: imagePath.url, category, subcategory, brand, stock, rating, reviews: parsedReviews
    };

    if (subcategory) {
      updateData.subcategory = subcategory;
    }
    console.log("Update Data:", updateData);

    const updatedProduct = await productModel.findByIdAndUpdate(proId._id, updateData, { new: true });
    console.log("Updated Product:", updatedProduct);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({ payload: updatedProduct, message: "Product updated successfully." });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

export { productCreate, fetchProducts,fetchProductById, productDeleteById, updateProduct }