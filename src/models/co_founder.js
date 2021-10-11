// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const cofSchema = mongoose.Schema({
  profileInfo: {
    vmid: { type: String, required: true },
    profileUrl: { type: String, required: true },
    linkedInProfileUrl: { type: String, required: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    fullName: { type: String, required: true },
    location: { type: String, required: false },
    title: { type: String, required: true },
    isPremium: { type: Boolean, required: true },
    profileImageUrl: { type: String, required: false }
  },
  companyInfo: {
    companyName: { type: String, required: true },
    companyId: { type: String, required: true },
    companyUrl: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    industry: { type: String, required: false },
    location: {
      country: { type: String, required: false },
      city: { type: String, required: false }
    },
    createdAt: {
      month: { type: Number, required: false },
      year: { type: Number, required: true },
    },
    companyImageUrl: { type: String, required: false },
    summary: { type: String, required: false },
    timestamp: { type: String, required: true }
  }

});

export default mongoose.model('Co-founder', cofSchema);

