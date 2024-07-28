import meterialModel from "../models/material.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createMaterial = asyncHandler(async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "Name and Description are required." });
        }
        const meterial = await meterialModel.create({ name, description });

        return res.status(201).json({ data: meterial, message: "Material created successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
})

const materialList = asyncHandler(async (req, res) => {
    try {
        const meterial = await meterialModel.find();
        if (!meterial) {
            return res.status(404).json({ message: "No meterial found." })
        }
        return res.status(200).json({ data: meterial, message: "fetch meterial successfully." })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

const fetchMaterialById = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const meterial = await meterialModel.findById(id);
        console.log(meterial)

        if (!meterial) {
            return res.status(404).json({ message: "Meterial not found." })
        }
        return res.status(200).json({ data: meterial, message: "fetch meterial successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

const meterialDeleteById = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const meterial = await meterialModel.findByIdAndDelete(id);
        if (!meterial) {
            return res.status(404).json({ message: "Meterial not found." })
        }
        return res.status(200).json({ message: "Mterial deleted successfully." })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

const updateMeterial = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;

        const meterialId = await meterialModel.findById(id);

        if (!meterialId) {
            return res.status(404).json({ message: "meterial Id not found." })
        }

        const meterial = await meterialModel.findByIdAndUpdate(id, { name, description }, { new: true });

        if (!meterial) {
            return res.status(404).json({ message: "Meterial not found." })
        }
        return res.status(200).json({ data: meterial, message: "meterial updated successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

export {
    createMaterial,
    materialList,
    fetchMaterialById,
    meterialDeleteById,
    updateMeterial
}