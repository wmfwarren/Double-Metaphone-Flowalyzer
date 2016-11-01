"use strict";

app.controller("NavCtrl", ["$scope", "$http", "$location", "searchDataFactory", function($scope, $http, $location, searchDataFactory) {
	$scope.searchTerm = null;

	$scope.searchArtist = () => {

		$http.post("/api/searchArtistFlows", {searchTerm: $scope.searchTerm})
			.then((data) => {
				searchDataFactory.setSearchData(data);
				$location.path("/artistResults");
			})
			.catch(console.error);
	};

	$scope.searchTrack = () => {

		$http.post("/api/searchTrackFlows", {searchTerm: $scope.searchTerm})
			.then((data) => {
				searchDataFactory.setSearchData(data);
				$location.path("/songResults");
			})
			.catch(console.error);
	};

}]);
