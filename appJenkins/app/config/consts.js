angular.module('primeiraApp').constant('consts', {
    appName: 'Automation Jenkins - IBM [OI]',
    version: '1.0.0',
    owner: 'Automation Team',
    year: '2021',
    site: 'http://9.45.220.67:8090',
    apiUrl: 'http://localhost:3005/api',
    oapiUrl: 'http://localhost:3005/oapi',

    userKey: '_primeira_app_user'
}).run(['$rootScope', 'consts', function ($rootScope, consts) {
    $rootScope.consts = consts
}])
