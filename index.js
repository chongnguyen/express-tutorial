var express = require('express');
var bodyParser = require('body-parser');
var low = require('lowdb');
var shortid = require('shortid')
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);
var app = express();

db.defaults({ users: [] })
    .write()

var port = 3000;


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('views', './views1');
app.set('view engine', 'pug');

app.get('/', function (request, response) {
    response.render('index', {
        name: 'Nguyen Duc Trong'
    });
});

app.get('/users', function (request, response) {
    response.render('users/index', {
        title: 'todo list',
        users: db.get("users").value()
    });
});

app.get('/users/search', function (request, response) {
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

app.get('/users/create', function (request, response) {
    response.render('users/create');
});

app.get('/users/:id', function (req, res) {
    var id = req.params.id;
    var user = db.get('users')
        .find({ id: id })
        .value();

    res.render('users/view', {
        user: user
    });
})

app.post('/users/create', function (req, res) {
    req.body.id = shortid.generate();
    var user = req.body;

    db.get('users')
        .push(user)
        .write()

    res.redirect('/users');

})

app.listen(port, function () {
    console.log('listen to port:' + port);
})
