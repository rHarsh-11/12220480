import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  ip: String,
  referrer: String,
  country: String,
  city: String
});

const shortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  clicks: [clickSchema]
});

export default mongoose.model('ShortUrl', shortUrlSchema);
