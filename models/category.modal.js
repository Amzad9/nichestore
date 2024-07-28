import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Category name should not exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Category description should not exceed 500 characters'],
  },
  image:{
    type:String,
  }
}, { timestamps: true });

const categoryModal = mongoose.model('Category', categorySchema);
export default categoryModal
