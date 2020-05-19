const express = require('express')
// const multer = require('multer')

const controller = require('../controllers/userapi.controller')
// const validate = require('../validate/user.validate')
// const upload = require('../middleware/uploadimage.middleware')

// const upload = multer({ dest: './public/img/' })
// var path = require('path')

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/img/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname) //Appending extension
//     }
// })

// var upload = multer({ storage: storage });

const router = express.Router()

router.get('/', controller.index)

// router.get('/search', controller.search)

// router.get('/create', controller.create)

// router.get('/:id', controller.view)

// router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate)

// router.post('/:id', controller.delete)

module.exports = router