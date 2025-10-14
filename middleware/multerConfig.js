const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb){          //file lai ka store garne - location
        cb(null, './uploads')                // callback(error, success)
    },
    filename: function(req,file,cb){          // upload gareko file name k rakhne
        cb(null, Date.now() + "-" + file.originalname)   //filename is: todayDate in millisecond-filename, for to avoid name conflict
    }
});



module.exports = {multer, storage}