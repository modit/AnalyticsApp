'use strict';


ApplicationConfiguration.registerModule('modit.admin',  [
  'modit.api.v1',
  'modit.thumb',
  'ui.router',
  'ui.bootstrap',
  'modit.admin.welcome',
  'modit.admin.home',
  'modit.config'
  //'templateImport'
])

// angular.module('modit.admin', [
//   'modit.api.v1',
//   'modit.thumb',
//   'ui.router',
//   'ui.bootstrap',
//   'modit.admin.welcome',
//   'modit.admin.home',
//   'modit.config'
//   //'templateImport'
// ])

// .provider('templateBaseUrl', function() {
//   return {
//     $get: function() {
//       return 'src/app/templates/';
//     }
//   };
// })

// Use Applicaion configuration module to register a new module

angular.module('modit.admin')

.config(function($locationProvider, $stateProvider, $urlRouterProvider, templateBaseUrl) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $stateProvider.state('app', {
    url: '/',
    controller: 'AppCtrl',
    templateUrl: templateBaseUrl + 'app.tpl.html'
  });
  $urlRouterProvider.otherwise( '/' );
})

.run(function($rootScope, $state, $location, api, ngToast) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    ngToast.dismiss();
  });
  
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if($state.is('app')){
      $state.go('app.home');
    }
  });
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    if(error.data === 'Not Authenticated'){
      if(!$state.includes('app.welcome')){
        $state.go('app.welcome', { redirect: $location.url().substr(1) ? $location.absUrl() : undefined });
      }else {
        $state.go('app.welcome');
      }
    } else if(error.status === 404) {
      $state.go('404');
    } else {
      console.log('stateChangeError', toState, fromState, error);
      $state.go('app.error', { status: error.status, error: error.data });
    }
    event.preventDefault();
  });
})

.controller('ModitCtrl', ['$scope', function($scope) {

}])

.controller('AppCtrl', function($scope, CORE_HOST, TARGET_VERSION, imageBaseURL, templateBaseUrl, $log) {
  $scope.$root.$log = $log.log;
  console.log("Target version", TARGET_VERSION);
  $scope.$root.templateBaseUrl = templateBaseUrl;
  $scope.$root.TARGET_VERSION = TARGET_VERSION;
  $scope.logo = imageBaseURL + 'logo.svg';
  $scope.CORE_HOST = CORE_HOST;
})
;