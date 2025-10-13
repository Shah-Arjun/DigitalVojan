const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb){          //file lai ka store garne- location
        cb(null, './uploads')                // callback(error, success)
    },
    filename: function(req,file,cb){          // file name k rakhne
        cb(null, file.originalname)
    }
});



module.exports = {multer, storage}