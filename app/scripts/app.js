(function() {
  function config($locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });
  }


  angular
    .module('bloctime', ['ui.router', 'firebase'])
    .config(config)
})();
