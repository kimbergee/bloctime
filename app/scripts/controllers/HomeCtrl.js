(function() {
  function HomeCtrl($scope, Tasks) {

    var init = function() {
      $scope.tasks = Tasks.all;
      $scope.newTask = {
        text: "",
        time: firebase.database.ServerValue.TIMESTAMP,
      }
    };

    $scope.addTask = function() {
      Tasks.addTask($scope.newTask);
      $scope.newTask.text = "";
    };

    init();
  };

  angular
    .module('bloctime')
    .controller('HomeCtrl', ['$scope', 'Tasks', HomeCtrl]);
})();
