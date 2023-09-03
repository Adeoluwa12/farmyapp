const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();



// Connect to MongoDB
mongoose.connect('mongodb+srv://Adeoluwa123:09014078564Feranmi@cluster0.r8sg61r.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




// Importing the Store model
const Store = require('./models/store');



// Middleware to parse JSON requests
app.use(bodyParser.json());





// Search stores by longitude and latitude and order by proximity
app.get('/api/stores', async (req, res) => {
  // const { name } = req.query;
  
  // if (!name) {
  //   return res.status(400).json({ error: 'Name parameter is required' });
  // }
  const { longitude, latitude } = req.query;

  if (!longitude || !latitude) {
    return res.status(400).json({ error: 'Longitude and latitude parameters are required' });
  }

  try {
    const coordinates = [parseFloat(longitude), parseFloat(latitude)];

    const stores = await Store.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: coordinates,
          },
          $maxDistance: 10000, // Maximum distance in meters
        },
      },
    });

    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
