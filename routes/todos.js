var express = require('express');
var router = express.Router();

var Todo = require('../models/todoModel.js')

router.get('/add', function (request, res) {

    var newTodoDocument = new Todo({ task: request.body.x })
    newTodoDocument.save(function (err) {
        if (err) return res.send('error')

        res.send('todo saved')

    })
})

router.get('/read-todos', function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send('error reading todos')
            return
        }
        res.send(todos);
    });
});


router.delete('/delete-todos/:id', function (req, res) {
    Todo.findOneAndRemove({ _id: req.params.id }, function (err, todos) {
        if (err) return res.send('error')
        res.send(todos);
    })
})

router.get('/read-one-todo/:id', function (req, res) {
    Todo.findById({ _id: req.params.id }, function (err, todo) {
        if (err) return res.send('error')
        res.send(todo);
    })
})

router.put('/update-todo/:id', function (req, res) {
    console.log(req.body)
    Todo.findByIdAndUpdate(req.params.id, req.body, function (err) {
        if (err) return res.send('error')
        res.send('updated')
    })
})
module.exports = router

