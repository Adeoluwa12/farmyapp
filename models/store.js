// models/store.js
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
});

storeSchema.index({ location: '2dsphere' }); // Create a geospatial index

module.exports = mongoose.model('Store', storeSchema);
