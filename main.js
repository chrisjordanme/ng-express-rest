(function ($, angular, undefined) {

    $(function () {

        $('#create').on('change', function () {
            var $self = $(this);

            $.ajax({
                url: '/api/bears',
                type: 'POST',
                data: {name: $self.val()},
                success: function () {
                    console.log('item successfully added');
                },
                error: function () {
                    console.log('err');
                }
            })
        });

        $('#putter').on('change', function () {

            var $self = $(this);
            console.log($self.val());

            $.ajax({
                url: '/api/bears/548e12196f27f21c74377326',
                type: 'PUT',
                data: {name: $self.val()},
                success: function () {
                    console.log('yes');
                },
                error: function () {
                    console.log('no');
                }
            });

        });

    });

    angular.module('myApp', ['controllers', 'services', 'ngResource']);

    angular.module('controllers', [])
        .controller('mainCtrl', function ($scope, api, $http) {

            api.then(function (data) {
                console.log(data.data);

                $scope.dat = data.data;
                return data.data;
            });

            $scope.removeItem = function (item) {
                console.log(item._id);
                $http.delete('/api/bears/' + item._id);
            };

        });

    angular.module('services', [])
        .factory('api', function ($http) {


            var url = '/api/bears';

            //return $resource(url, {}, {get: {method: 'GET'}});
            return $http.get(url);
        });


})(jQuery, angular);

