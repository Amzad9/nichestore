import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subcategory name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Subcategory name should not exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Subcategory description should not exceed 500 characters'],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: [true, 'Category reference is required'],
  },
}, { timestamps: true });

const subCategortModel =  mongoose.model('Subcategory', subcategorySchema);
export default subCategortModel;

