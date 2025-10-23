// all logic related to user profile goes here

const User = require('../../../model/userModel')
const bcrypt = require('bcryptjs')



// GET my profile controller
exports.getMyProfile = async (req, res) => {
    const userId = req.user.id
    const myProfile = await User.findById(userId).select("-password")
    if(!myProfile){
        return res.status(404).json({
            message: "User not exist with that id"
        })
    }
    res.status(200).json({
        data: myProfile,
        message: "Profile fetched successfully"
    })
}




// UPDATE my profile controller  ---> except password
exports.updateMyProfile = async (req, res) => {
    const {userName, userEmail, userPhoneNumber} = req.body
    const userId = req.user.id
    //update profile
    const updatedProfile = await User.findByIdAndUpdate(userId, {
        userName,
        userEmail,
        phoneNumber: userPhoneNumber
    }, {
        runValidators: true      //validate the frontend data according to User model/schema
    })
    res.status(200).json({
        message: "Profile updated successfully",
        data: updatedProfile
    })
}




// DELETE my profile
exports.deleteMyProfile = async(req, res) => {
    const userId = req.user.id
    await User.findByIdAndDelete(userId)
    res.status(200).json({
        message: "Profile deleted successfully",
        data: null
    })
}




//UPDATE my password controller
exports.updateMyPassword = async (req, res) => {
    const userId = req.user.id
    const {oldPassword, newPassword, confirmPassword} = req.body
    if(!oldPassword || !newPassword || !confirmPassword){
        return res.status(400).json({
            message: "Please provide oldPassword, newPassword, confirmPassword"
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message: "newPassword and confirmPassword didn't matched"
        })
    }

    //taking out the hashed oldPassword from db
    const userData = await User.findById(userId)
    const hashedOldPassword = userData.userPassword

    //check if oldPassword is correct or not
    const isOldPasswordCorrect = bcrypt.compareSync(oldPassword, hashedOldPassword)
    if(!isOldPasswordCorrect){
        return res.status(400).json({
            message: "oldPassword didn't matched",
        })
    }

    //if odlPassword match
    userData.userPassword = bcrypt.hashSync(newPassword, 12)   // newPassword lai hash garera userPassword field ma hal
    await userData.save()    //updated gareko data db ma save gar
    res.status(200).json({
        message: "Password changed successfully",
    })
}