const mongoose = require('mongoose');
const User = require('../model/userModel')

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }



  //check if admin is seeded or not
  const isAdminExist = await User.findOne({ userEmail: "admin@gmail.com" });
  //console.log(isAdminExist);

  if (!isAdminExist) {
    // admin seeding
    await User.create({
      userEmail: "admin@gmail.com",
      userPassword: "admin",
      userName: "Admin",
      phoneNumber: "98000000",
      role: "admin",
    });

    console.log("Admin seeded successfully");
  } else {
    console.log("Admin already seeded")
  }


};

module.exports = connectMongoDB;
