var mongoose = require('mongoose');
var todoSchema = mongoose.Schema({
    task: String
});

var Todo = mongoose.model('todo', todoSchema);

module.exports = Todo
