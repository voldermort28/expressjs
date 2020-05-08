const express = require('express')

var bodyParser = require('body-parser')

var controller = require('../controllers/auth.controller')
const validate = require('../validate/auth.validate')

const router = express.Router()

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.get('/login', controller.login)

router.post('/login', validate.postLogin, controller.postLogin)

module.exports = router