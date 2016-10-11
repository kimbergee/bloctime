(function() {
  function timer($interval, MY_TIMES) {
    return {
      templateUrl: '/templates/directives/timer.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, elemnt, attributes) {

        var interval, incrementTimer;
        var mySound = new buzz.sound("/assets/sounds/DingLing.mp3", {
          preload: true
        });

        scope.onBreak = false;
        scope.isActive = false;
        scope.buttonText = "Start";
        scope.message = "Time to work!";
        scope.currentTime = MY_TIMES.work;
        scope.completedWorkSesh = 1;

        // if i wanted to use scope.$watch
        // scope.$watch('currentTime', function() {
        //   console.log('scope.currentTime', scope.currentTime);
        //   if (scope.currentTime == 1) {
        //     mySound.play();
        //   }
        // });

        incrementTimer = function() {
          scope.currentTime--;

          if (scope.currentTime <= 0) {
            if (!scope.onBreak) {
              if (scope.completedWorkSesh == 4) {
                scope.currentTime = MY_TIMES.longBreak;
                scope.onBreak = true;
                scope.message = "Take a long break!";
                scope.completedWorkSesh = 0;
              } else {
                scope.currentTime = MY_TIMES.break;
                scope.onBreak = true;
                scope.message = "Take a break!";
                scope.completedWorkSesh++;
              }
            } else {
              scope.currentTime = MY_TIMES.work;
              scope.onBreak = false;
              scope.message = "Time to work!";
            }
            mySound.play();
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
      // "work": 1500,
      // "break": 300,
      // "longBreak": 1800
      "work": 5,
      "break": 5,
      "longBreak": 5
    });
})();
