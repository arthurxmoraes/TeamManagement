var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

myApp.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {

    $locationProvider.html5Mode(true);
    
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'AppController'
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'AppController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })
        .when('/contact-success', {
            templateUrl: 'views/contact-success.html',
            controller: 'ContactController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

myApp.directive('randomTeam', [() => {
    return {
        restrict: 'E',
        scope: {
            teams: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace: true,
        controller: $scope => {
            $scope.random = Math.floor(Math.random() * 4);
        }
        
    };
}]);

myApp.controller('AppController', ['$scope', '$http', function($scope, $http) {
    
    $scope.removeTeam = team => {
        var removedTeam = $scope.teams.indexOf(team);

        $scope.teams.splice(removedTeam, 1);
    };

    $scope.addTeam = () => {
        $scope.teams.push({
            name: $scope.newTeam.name,
            color: [$scope.newTeam.color1, $scope.newTeam.color2],
            titles: parseInt($scope.newTeam.titles),
            available: true
        });
        
        $scope.newTeam.name = "";
        $scope.newTeam.color1 = "";
        $scope.newTeam.color2 = "";
        $scope.newTeam.titles = "";
    };

    $scope.removeAll = () => {
        $scope.teams = [];
    }

    $http.get('data/teams.json').then(response => {
        $scope.teams = response.data;
    });

}]);

myApp.controller('ContactController', ['$scope', '$location', function($scope, $location){
    $scope.sendMessage = () => {
        $location.path('/contact-success');
    }
}]);