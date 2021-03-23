angular.module('primeiraApp').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider.state('jenkins', {
            url: "/",
            templateUrl: "jenkins/index.html"
        })
        $httpProvider.interceptors.push('handleResponseError')
    }
]).run(['$rootScope', '$http', '$location', '$window',
    function ($rootScope, $http, $location, $window) {
        validateUser()
        $rootScope.$on('$locationChangeStart', () => validateUser())

        function validateUser() {
            $location.path('jenkins')
        }
    }
])