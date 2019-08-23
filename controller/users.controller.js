var db = require('../db');
var shortid = require('shortid')

module.exports.index = function (request, response) {
    response.render('users/index', {
        title: 'todo list',
        users: db.get("users").value()
    });
}

module.exports.search = function (request, response) {
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
}

module.exports.create = function (request, response) {
    response.render('users/create');
}

module.exports.view = function (req, res) {
    var id = req.params.id;
    var user = db.get('users')
        .find({ id: id })
        .value();

    res.render('users/view', {
        user: user
    });
}

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    var user = req.body;

    db.get('users')
        .push(user)
        .write()

    res.redirect('/users');

}