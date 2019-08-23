var express = require('express')
var db = require('../db');
var shortid = require('shortid')

var router = express.Router()


router.get('/', function (request, response) {
    response.render('users/index', {
        title: 'todo list',
        users: db.get("users").value()
    });
});

router.get('/search', function (request, response) {
    var q = request.query.q;
    var users = db.get("users").value();
    var matchedUser = users.filter(function (x) {
        return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    response.render('users/index', {
        title: 'todo list',
        value: q,
        users: matchedUser
    });
})

router.get('/create', function (request, response) {
    response.render('users/create');
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    var user = db.get('users')
        .find({ id: id })
        .value();

    res.render('users/view', {
        user: user
    });
})

router.post('/create', function (req, res) {
    req.body.id = shortid.generate();
    var user = req.body;

    db.get('users')
        .push(user)
        .write()

    res.redirect('/users');

})

module.exports = router;
