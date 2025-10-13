// function to restrict authorization
const restrictTo = (...roles) => {               // ...   => rest operator ,that catches the passed parameters and changes into array 
    //returning middleware
    return (req, res, next) => {
        const userRole = req.user.role   //req.user is logged in user details passed from isAuthenticated
        if(!roles.includes(userRole)){
            res.status(403).json({
                message: "You don't have permission for this.forbidden"
            })
        } else {
            next()      // after successful restriction runs the next parameter ie. createProduct controller
        }
    }
}


module.exports = restrictTo