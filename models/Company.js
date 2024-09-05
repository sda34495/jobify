import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfEmployees: {
      type: Number,
      required: true,
      min: 1,
    },
    companyType: {
      type: String,
      enum: ['Private', 'Public', 'Government', 'Non-profit'],
      required: true,
    },
    founded: {
      type: Date,
    },
    industry: {
      type: String, 
      enum: ['Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Other'],
      required: true,
    },
    revenue: {
      type: Number, 
      min: 0,
    },
    website: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        'Please enter a valid website URL',
      ],
    },
    culture: {
      type: String, 
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Company', CompanySchema);
