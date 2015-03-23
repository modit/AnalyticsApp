angular.module('modit.admin.welcome', [
  'ui.router',
  'modit.api.v1',
  'modit.config'
])
  
.config(function($locationProvider, $stateProvider, $urlRouterProvider, templateBaseUrl) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $stateProvider.state('app.welcome', {
    url: 'welcome',
    views: {
      main: {
        controller: 'WelcomeCtrl',
        templateUrl:  templateBaseUrl + 'welcome.tpl.html'
      }
    }

  });
  $urlRouterProvider.otherwise( '/' );
})

.controller('WelcomeCtrl', function($scope, API_HOST, templateBaseUrl) {
  console.log(templateBaseUrl);
  $scope.templateBaseUrl = templateBaseUrl;
  $scope.API_HOST = API_HOST;
  $scope.origin = window.location.origin;
})
;
  