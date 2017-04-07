(function() {
  angular
    .module('App', ["ui.router"])
    .config( function($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('/index'); //default state

      //Sectional Routes
      $stateProvider
        .state('schedule', {
          url: '/schedule',
          templateUrl: '/schedule.html',
          controller: 'scheduleCtrl'
        })
        .state('find', {
          url: '/find',
          templateUrl: '/find.html'
        })
        .state('login', {
          url: '/login',
          templateUrl: '/login.html'
        })
        .state('register', {
          url: '/register',
          templateUrl: '/register.html'
        })


    });
})();
