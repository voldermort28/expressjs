const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) //Appending extension
    }
})

var upload = multer({ storage: storage });

module.exports = upload