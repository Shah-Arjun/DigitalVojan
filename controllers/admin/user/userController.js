const User = require("../../../model/userModel")


// GET all users by admin
exports.getUsers = async (req, res) => {
    const loggedInAdminId = req.user.id   //form auth middleware
    
    const users = await User.find({_id: {$ne: loggedInAdminId}}).select(["+otp", "+isOtpVerified"])       // find() returns array of object

    if(users.length > 1) {           // user is not empty, 1 user is admin
        res.status(200).json({
            message: "Users found",
            data: users
        })
    } else {
        res.status(404).json({
            message: "No user found",
            data: []
        })
    }
     
    
}