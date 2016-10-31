"use strict";

app.controller("SongResultsCtrl", ["$scope", "$http", "searchDataFactory", function($scope, $http, searchDataFactory) {

	$scope.songInfo = searchDataFactory.getSearchData();

	console.log("$scope.songInfo", $scope.songInfo);

}]);
