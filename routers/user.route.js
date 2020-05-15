const express = require('express')
const multer = require('multer')

const controller = require('../controllers/user.controller')
const validate = require('../validate/user.validate')

const upload = multer({ dest: './public/img/' })

const router = express.Router()

router.get('/', controller.index)

router.get('/search', controller.search)

router.get('/create', controller.create)

router.get('/:id', controller.view)

router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate)

router.post('/:id', controller.delete)

module.exports = router