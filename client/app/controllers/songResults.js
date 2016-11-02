"use strict";

app.controller("SongResultsCtrl", ["$scope", "$http", "$location", "searchDataFactory", function($scope, $http, $location, searchDataFactory) {

	$scope.songInfo = searchDataFactory.getSearchData();


}]);
