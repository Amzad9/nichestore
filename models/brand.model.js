import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Brand name should not exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Brand description should not exceed 500 characters'],
  },
}, { timestamps: true });

const brandModel =  mongoose.model('Brand', brandSchema);
export default brandModel;
