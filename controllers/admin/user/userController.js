const User = require("../../../model/userModel")


// GET all users by admin
exports.getUser = async (req, res) => {
    const users = await User.find()       // returns array of object

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