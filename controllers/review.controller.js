
import reviewModel from "../models/review.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createReview = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const { product, user, rating, comment } = req.body;

        const selectFields = ["product", "user", "rating", "comment"];
        const missingField = selectFields.filter((fields) => !Object.hasOwn(req.body, fields));
        if (missingField.length > 0) {
            return res.status(400).json({ message: `Missing required fields:  ${missingField.join(" ,")}` })
        }

        const review = await reviewModel.create({ product, user, rating, comment });

        return res.status(201).json({ data: review, message: "Review created successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
})

export {
    createReview
}