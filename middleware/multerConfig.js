const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
      //file lai ka store garne - location

      //checks the mimetype of file
      const allowedFileType = ["image/png", "image/jpg", "image/jpeg"];
      if (!allowedFileType.includes(file.mimetype)) {
        cb(new Error("This file type is not supported"));
        return;
      }


      //checks the size of file logic goes here
    //   const allowedFileSize = 1 * 1024 * 1024; // 1 MB in bytes
    //   if (file.size > allowedFileSize) {
    //     cb(new Error("File size up to 1MB is only supported"));
    //     return;
    //   }


    
      cb(null, "./uploads"); // callback(error, success)---> if success then save in uploads
    },
    filename: function(req,file,cb){          // upload gareko file name k rakhne
        cb(null, Date.now() + "-" + file.originalname)   //filename is: todayDate in millisecond-filename, for to avoid name conflict
    }
});



module.exports = {multer, storage}