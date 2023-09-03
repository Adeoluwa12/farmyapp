// insertData.js
const mongoose = require('mongoose');
const Store = require('./models/store');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Adeoluwa123:09014078564Feranmi@cluster0.r8sg61r.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const sampleStores = [
  { name: 'OMAST STORES', location: { type: 'Point', coordinates: [-73.968256, 40.780856] } },
  { name: 'HADASSAH STORES', location: { type: 'Point', coordinates: [-74.0060, 40.7128] } },
  { name: 'BLESSED STORES', location: { type: 'Point', coordinates: [-73.6060, 38.7128] } },
  // Add more store data here with location coordinates
];

async function insertSampleData() {
  try {
    await Store.insertMany(sampleStores);
    console.log('Sample data inserted successfully');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

insertSampleData();
