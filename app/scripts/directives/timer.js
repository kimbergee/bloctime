(function() {
  function timer($interval) {
    return {
      templateUrl: '/templates/directives/timer.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, elemnt, attributes) {

        var interval, incrementTimer;

        scope.buttonText = "Start"
        scope.isActive = false;
        scope.workTimer = 1500;

        incrementTimer = function() {
          scope.workTimer = scope.workTimer - 1;
        };

        scope.toggle = function() {
          if (scope.isActive == false) {
            scope.buttonText = "Stop"
            interval = $interval(incrementTimer, 1000, 1500);
            scope.isActive = true;
          } else if (scope.isActive == true) {
            scope.buttonText = "Start"
            $interval.cancel(interval);
            scope.workTimer = 1500;
            scope.isActive = false;
          }
        };
      }
    };
  }

  angular
    .module('bloctime')
    .directive('timer', timer);
})();
