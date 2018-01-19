var appX = angular.module('mainApp', ["ngRoute"]);

appX.controller('homepage', function ($scope, $http) {

    $http.get('/read-todos').then(function (res) {
        console.log(res.data)
        $scope.tasks = res.data
    })

    $scope.tasks = [];
    $scope.searchEnter = function () {
        $http.post('/add', { x: $scope.task }).then(function (res) {
            $http.get('/read-todos').then(function (res) {
                $scope.tasks = res.data
            })
        })

    };

    $scope.addTask = function () {
        $scope.tasks.push({ 'taskMessage': $scope.task, 'status': 'false' });
        console.log($scope.tasks);
        $scope.task = '';
    };
    $scope.contentEdit = function () {
        console.log('something');
        event.target.contentEditable = event.target.contentEditable === "false" ? "true" : "false";

    };
    $scope.enterAgain = function (msg) {
        if (event.which === 13 && msg !== "") {
            $scope.contentEdit();
            console.log(11);
        }

    };
    $scope.updateTodo = function (editedTask, $index) {
        $scope.tasks[$index] = editedTask
        console.log($scope.tasks)
    }

    $scope.deleteTodo = function (todo, $index) {
        $http.delete('/delete-todos/' + todo._id).then(function (res) {
            $http.get('/read-todos').then(function (res) {
                $scope.tasks = res.data
            })
        })
    }

})

appX.controller('editCtrl', function ($scope, $routeParams, $http) {
    $http.get('/read-one-todo/' + $routeParams.id).then(function (res) {
        $scope.todo = res.data;
    })
    $scope.editTodo = function () {
        console.log($scope.todo)
        $http.put('/update-todo/' + $scope.todo._id, $scope.todo).then(function (res) {
            console.log(res.data)
        })
    }
})

appX.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: '/views/homepage.html',
            controller: 'homepage'
        })
        .when("/edit/:id", {
            templateUrl: "/views/edit-todo.html",
            controller: 'editCtrl'
        })
});
