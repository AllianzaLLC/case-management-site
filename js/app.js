var routerApp = angular.module('routerApp', ['ngAutocomplete','ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        .state('us', {
            url: '/us',
            templateUrl: 'us.html'
            // we'll get to this in a bit
        })
        .state('caseManagement', {
            url: '/caseManagement',
            templateUrl: 'caseManagement.html'
            // we'll get to this in a bit
        })
        .state('ourTeam', {
            url: '/ourTeam',
            templateUrl: 'ourTeam.html'
            // we'll get to this in a bit
        })
        .state('contactUs', {
            url: '/contactUs',
            templateUrl: 'contactUs.html',
            controller: 'contactController'
            // we'll get to this in a bit
        })
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'form/form.html',
            controller: 'formController'
        })

        // nested states
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.employer', {
            url: '/employer',
            templateUrl: 'form/employer-profile.html'
        })

        // url will be /form/interests
        .state('form.carrier', {
            url: '/carrier',
            templateUrl: 'form/carrier-profile.html'
        })

        // url will be /form/payment
        .state('form.claimant', {
            url: '/claimant',
            templateUrl: 'form/employee-profile.html'
        })

        .state('form.occurance', {
            url: '/occurance',
            templateUrl: 'form/occurance.html'
        })
        // url will be /form/payment
        .state('form.other', {
            url: '/other',
            templateUrl: 'form/other.html'
        });
})
    .controller('homeController', function($scope, $location){
        $scope.changeView = function(view){
            $location.path(view); // path not hash
        }
    })
    .controller('formController', function($scope) {

        $scope.result = '';
        $scope.options1 = null;
        $scope.details1 = '';


        // we will store all of our form data in this object
        $scope.formData = {};

        $scope.debug = function(){
            alert(result);
        };

        $scope.cancel = function(){
            if(confirm("Are you sure you want to cancel?") == true){
                window.location.replace('ruvdev.com');
            }
        }


        // function to process the form
        $scope.processForm = function() {
            alert('awesome!');
        };

    })
    .controller('contactController', function($scope,$http){

        $scope.submitContact = function(){
            alert('Procces Form was called');

            var contactParams = $.param({ from: $scope.from, fromEmail:$scope.fromEmail,  message: $scope.message, company: $scope.company});
            alert(contactParams);
            $http({
                url: 'http://ec2-52-27-132-140.us-west-2.compute.amazonaws.com/email',
                method: 'POST',
                data: contactParams,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (response) {
                alert(response)
                console.log(response);
            });

        }

    });