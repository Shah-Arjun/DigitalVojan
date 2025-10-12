const User = require("./model/userModel");
const bcrypt = require('bcrypt')

const adminSeeder = async () => {
     //check if admin is seeded or not
  const isAdminExist = await User.findOne({ userEmail: "admin@gmail.com" });
  //console.log(isAdminExist);

  if (!isAdminExist) {
    // admin seeding
    await User.create({
      userEmail: "admin@gmail.com",
      userPassword: bcrypt.hashSync("admin", 10),
      userName: "Admin",
      phoneNumber: "98000000",
      role: "admin",
    });

    console.log("Admin seeded successfully");
  } else {
    console.log("Admin already seeded")
  }

}

module.exports = adminSeeder    