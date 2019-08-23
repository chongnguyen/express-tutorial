var express = require('express')

var controller = require ('../controller/users.controller');

var router = express.Router()


router.get('/', controller.index);

router.get('/search', controller.search)

router.get('/create', controller.create);

router.get('/:id', controller.view)

router.post('/create', controller.postCreate)

module.exports = router;
