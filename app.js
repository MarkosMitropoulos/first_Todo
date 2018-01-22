var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var todos = require('./routes/todos.js')

var Todo = require('./models/todoModel.js')

var app = express();
app.use('/todos', todos);

mongoose.connect('mongodb://localhost/todos');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html')
})

app.listen(4000, function () {
    console.log('app started on port 4000')
})