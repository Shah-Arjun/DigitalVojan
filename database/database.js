const mongoose = require('mongoose');
const User = require('../model/userModel');
const adminSeeder = require('../adminSeeder');

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }

  //admin sidding function call
  adminSeeder()

};

module.exports = connectMongoDB;
