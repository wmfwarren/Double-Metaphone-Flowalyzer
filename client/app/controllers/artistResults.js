"use strict";

app.controller("ArtistResultsCtrl", ["$scope", "$http", "searchDataFactory", function($scope, $http, searchDataFactory) {

	$scope.songInfo = searchDataFactory.getSearchData();


}]);
