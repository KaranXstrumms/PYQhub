const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error('MONGO_URI is not defined in .env file');
      process.exit(1);
    }
    await mongoose.connect(uri);
    console.log('MongoDB Atlas Connected Successfully');
  } catch (err) {
    console.error('MongoDB Connection Failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
