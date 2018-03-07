angular.module('todoController', [])

	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		$scope.modalData = {};
		$scope.query = "";

		$(document).ready(function() {
                $('#priority').on('click',function() {
					  $scope.formData.priority = $(this).val()
					  
				});
				$('#priorityModal').on('click',function() {
					  $scope.modalData.priority = $(this).val()
					  
				});
         });

		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		$scope.createTodo = function() {

			if ($scope.formData.description != undefined) {
				$scope.loading = true;

                                 Todos.create($scope.formData)

					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {};
						$scope.todos = data;
					});
			}
		};

		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data;
				});
		};

		$scope.changeStatus = function(todo){
            		todo.status = "done";
            console.log(todo._id)
            Todos.update(todo)
               .success(function(data){
               	   $scope.todos = data;
               });
  

		};

		$scope.fillForm = function(todo){
			$scope.modalData._id = todo._id;
			$scope.modalData.status = todo.status;
			$scope.modalData.description = todo.description;
			$scope.modalData.notes = todo.notes;
			$scope.modalData.due_date = todo.due_date;
			$scope.modalData.category = todo.category;
			$scope.modalData.priority = todo.priority;
		}

		$scope.editTask = function(){
		 	Todos.update($scope.modalData)
               .success(function(data){
               	   $scope.todos = data;
               });
		}
	}]);
