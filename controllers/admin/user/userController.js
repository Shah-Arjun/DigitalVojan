const User = require("../../../model/userModel")


// GET all users by admin api logic
exports.getUsers = async (req, res) => {
    const loggedInAdminId = req.user.id   //form auth middleware
    
    const users = await User.find({_id: {$ne: loggedInAdminId}}).select(["+otp", "+isOtpVerified", "-__v"])       // find() returns array of object

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




// DELETE user by admin api logic
exports.deleteUser = async (req, res) => {
    const userId = req.params.id
    if(!userId) {
        return res.status(400).json({
            message: "Please provide user id"
        })
    }
    //checks id the user exist or not 
    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({
            message: "No user found with that id"
        })
    }

    await User.findByIdAndDelete(userId)
    res.status(200).json({
        message: "User deleted successfully"
    })
}