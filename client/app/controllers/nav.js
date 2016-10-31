"use strict";

app.controller("NavCtrl", ["$scope", "$http", "searchDataFactory", function($scope, $http, searchDataFactory) {
	$scope.searchTerm = null;

	$scope.searchArtist = () => {

		$http.post("/api/searchArtistFlows", {searchTerm: $scope.searchTerm})
			.then((data) => {
				searchDataFactory.setSearchData(data);
			})
			.catch(console.error);
	};

	$scope.searchTrack = () => {

		$http.post("/api/searchTrackFlows", {searchTerm: $scope.searchTerm})
			.then((data) => {
				searchDataFactory.setSearchData(data);
			})
			.catch(console.error);
	};

}]);
