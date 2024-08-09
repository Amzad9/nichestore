import categoryModal from "../models/category.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "./../utils/cloudinary.js"


// const selectFields = "name description, image ";

const createCategories = asyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;
    const datanme = await categoryModal.findOne({name});
    if(datanme){
      return res.status(400).json({message: "Category already exist" })
    }
    if (!name || !description) {
      return res.status(400).json({ message: "name and description are required." });
    }

    const image = req.files.image?.[0].path; 
    if (!image) {
      return res.status(400).json({ message: "Please upload an image." });
    }

    const imagePath = await uploadOnCloudinary(image)

    const category = await categoryModal.create({ name, description, image: imagePath.url });
    console.log(category)
    return res.status(201).json({ data: category, message: "Category created successfully." });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" })
  }
})

const categoryList = asyncHandler(async (req, res) => {
  try {
    const categories = await categoryModal.find();
    return res.status(200).json({ payload:categories, message: "Categories fetched successfully." })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" })
  }
})

const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModal.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." })
    }
    return res.status(200).json({ data: category, message: "Category fetched successfully." })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" })
  }
})

const categoryDeleteById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModal.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." })
    }
    return res.status(200).json({ data: category, message: "Category deleted successfully." })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" })
  }
})

const updateCategoryById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const catId = await categoryModal.findById(id);
    console.log({catId})
    if (!catId) {
      return res.status(404).json({ message: "Category not found." })
    }

    const imageUrl = req.files?.image[0].path;

    if (!imageUrl) {
      return res.status(400).json({ message: "Please upload an image." });
    }

    let imagePath;
    try {
      imagePath = await uploadOnCloudinary(imageUrl);
    } catch (uploadError) {
      return res.status(500).json({ message: "Image upload failed", error: uploadError.message });
    }

    const category = await categoryModal.findByIdAndUpdate(catId._id, { name, description, image: imagePath.url },{ new: true });

    return res.status(200).json({ data: category, message: "Category updated successfully." })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" })
  }
})

export { createCategories, categoryList, getCategoryById, categoryDeleteById, updateCategoryById }