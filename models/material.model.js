import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Material name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Material name should not exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Material description should not exceed 500 characters'],
  },
  image:{
    type: String
  }
}, { timestamps: true });

const meterialModel = mongoose.model('Material', materialSchema);
export default meterialModel
