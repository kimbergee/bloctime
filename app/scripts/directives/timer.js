(function() {
  function timer($interval, MY_TIMES) {
    return {
      templateUrl: '/templates/directives/timer.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, elemnt, attributes) {

        var interval, incrementTimer;

        scope.onBreak = false;
        scope.isActive = false;
        scope.buttonText = "Start";
        scope.message = "Time to work!";
        scope.currentTime = MY_TIMES.work;

        incrementTimer = function() {
          scope.currentTime--;

          if (scope.currentTime <= 0) {
            if (!scope.onBreak) {
              scope.currentTime = MY_TIMES.break;
              scope.onBreak = true;
              scope.message = "Take a break!";
            } else {
              scope.currentTime = MY_TIMES.work;
              scope.onBreak = false;
              scope.message = "Time to work!";
            }
            resetTimer();
          };
        };

        var startTimer = function() {
          interval = $interval(incrementTimer, 1000);
          scope.isActive = true;
          scope.buttonText = "Stop";
        };

        var resetTimer = function() {
          $interval.cancel(interval);
          scope.isActive = false;
          scope.buttonText = "Start";

          if (scope.onBreak) {
            scope.currentTime = MY_TIMES.break;
          } else {
            scope.currentTime = MY_TIMES.work;
          }
        };

        scope.toggle = function() {
          if (!scope.isActive) {
            startTimer();
          } else {
            resetTimer();
          }
        };
      }
    };
  }

  angular
    .module('bloctime')
    .directive('timer', timer)
    .constant("MY_TIMES", {
      "work": 1500,
      "break": 300
    });
})();
