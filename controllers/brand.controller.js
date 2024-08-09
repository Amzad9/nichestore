import brandModel from "../models/brand.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "./../utils/cloudinary.js"


const createBrand = asyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    const bransName = await brandModel.findOne({ name });
    if (bransName) {
      return res.status(400).json({ message: "Brand name already exists." });
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
    const brand = await brandModel.create({ name, description, image: imagePath.url });
    return res.status(201).json({ payload: brand, message: "Brand created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error creating brand." });
  }
})

const fetchBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await brandModel.find({}, 'name description image');
    if (!brand) {
      return res.status(404).json({ message: "Brand not found." });
    }
    return res.status(200).json({ payload: brand, message: "fetch brand successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching brand." });
  }
})

const fetchBrandById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await brandModel.findById(id, 'name, description, image');
    if (!brand) {
      return res.status(404).json({ message: "Category not found." })
    }
    return res.status(200).json({ brand, message: "Brand fetched successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching brand" });
  }
})

const deletebrand = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await brandModel.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found." })
    }
    return res.status(200).json({ message: "Brand deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting brand." });
  }
})

const updateBrand = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const brandId = await brandModel.findById(id);
    console.log({brandId})
    if (!brandId) {
      return res.status(404).json({ message: "Brand id not found." })
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
    const brand = await brandModel.findByIdAndUpdate(brandId._id, { name, description, image: imagePath.url }, { new: true });
    console.log({brand})
    if (!brand) {
      return res.status(404).json({ message: "Brand not found." })
    }
    return res.status(200).json({ payload: brand, message: "Brand updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error updating brand." });
  }
})

export { createBrand, fetchBrand, fetchBrandById, deletebrand, updateBrand }

