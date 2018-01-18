var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var Todo = require('./models/todoModel.js')

var app = express()

mongoose.connect('mongodb://localhost/todos');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.static(__dirname + '/public'))


app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html')
})


app.post('/add', function (request, res) {

    var newTodoDocument = new Todo({ task: request.body.x })
    newTodoDocument.save(function (err) {
        if (err) return res.send('error')

        res.send('todo saved')

    })
})

app.get('/read-todos', function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send('error reading todos')
            return
        }
        res.send(todos);
    });
});


app.delete('/delete-todos/:id', function (req, res) {
    Todo.findOneAndRemove({ _id: req.params.id }, function (err, todos) {
        if (err) return res.send('error')
        res.send(todos);
    })
})

app.get('/read-one-todo/:id', function (req, res) {
    Todo.findById({ _id: req.params.id }, function (err, todos) {
        if (err) return res.send('error')
        res.send(todos);
    })
})

app.listen(4000, function () {
    console.log('app started on port 4000')
})