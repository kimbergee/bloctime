(function() {
  function Tasks($firebaseArray) {
    var ref = firebase.database().ref();

    // download tasks into a synchronized array
    var tasks = $firebaseArray(ref);

    return {
      all: tasks,
      addTask: function(task) {
        tasks.$add(task);
      }
    };

  };

  angular
    .module('bloctime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();
