const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pawfectmatch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
