const express = require('express')

var controller = require('../controllers/user.controller')
var validate = require('../validate/user.validate')
const router = express.Router()

router.get('/', controller.index)

router.get('/search', controller.search)

router.get('/create', controller.create)

router.get('/:id', controller.view)

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.post('/create', validate.postCreate, controller.postCreate)

router.post('/:id', controller.delete)

module.exports = router