import subCategortModel from "../models/subCategory.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createSubCategory = asyncHandler(async (req, res) => {
    try {
        const { categoryId, name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "Name and Description are required." });
        }
        if (!categoryId) {
            return res.status(400).json({ message: "Category ID is required." });
        }
        const subcategory = (await subCategortModel.create({ categoryId, name, description }));
        return res.status(201).json({ data: subcategory, message: "Sub Category created successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
})

const subcategoryList = asyncHandler(async(req, res) => {
   try {
    const subcategory = await subCategortModel.find();
    if(!subcategory){
        return res.status(404).json({message: "No subcategories found."})
    }
    return res.status(200).json({ data: subcategory, message: "fetch subcategory successfully."})
   } catch (error) {
    return res.status(500).json({ message: "Internal server error"})
   }
})

const fetchSubCategoryById = asyncHandler(async(req, res) => {
   try {
    const id = req.params.id;
    const subcategory = await subCategortModel.findById(id);
    console.log(subcategory)

    if(!subcategory){
        return res.status(404).json({message: "Subcategory not found."})
    }
    return res.status(200).json({ data: subcategory, message: "fetch subcategory successfully"})
   } catch (error) {
    return res.status(500).json({ message: "Internal server error"})
   }
})

const subcategoryDeleteById = asyncHandler(async(req, res) => {
    try {
        const id = req.params.id;
        const subcategory = await subCategortModel.findByIdAndDelete(id);
        if(!subcategory){
            return res.status(404).json({message: "Subcategory not found."})
        }
        return res.status(200).json({message: "Subcategory deleted successfully."})
    } catch (error) {
        return res.status(500).json({ message: "Internal server error"})
    }
})

const updateSubCategory = asyncHandler(async(req, res) => {
  try {
    const id  = req.params.id;
    const {categoryId, name, description} = req.body;
    const subcatId = await subCategortModel.findById(id);
    if(!subcatId){
        return res.status(404).json({message: "Subcategory not found."})
    }

    const subcategory = await subCategortModel.findByIdAndUpdate(subcatId._id, {categoryId, name, description} ,{new: true})
    if(!subcategory){
        return res.status(404).json({message: "Subcategory not found."})
    }
    return res.status(200).json({ data: subcategory, message: "Subcategory updated successfully"})
  } catch (error) {
    return res.status(500).json({ message: "Internal server error"})
  }
})

export { createSubCategory, subcategoryList, fetchSubCategoryById,subcategoryDeleteById, updateSubCategory }