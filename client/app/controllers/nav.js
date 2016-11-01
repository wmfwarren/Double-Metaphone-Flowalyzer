"use strict";

app.controller("NavCtrl", ["$scope", "$http", "$location", "$route", "searchDataFactory", function($scope, $http, $location, $route, searchDataFactory) {
	$scope.searchTerm = null;

	$scope.searchArtist = () => {

		$http.post("/api/searchArtistFlows", {searchTerm: $scope.searchTerm})
			.then((data) => {
				searchDataFactory.setSearchData(data);
				if($location.path() === "/artistResults") {
					$route.reload();
				} else {
					$location.path("/artistResults");
				}
			})
			.catch(console.error);
	};

	$scope.searchTrack = () => {

		$http.post("/api/searchTrackFlows", {searchTerm: $scope.searchTerm})
			.then((data) => {
				searchDataFactory.setSearchData(data);
				if($location.path() === "/songResults") {
					$route.reload();
				} else {
					$location.path("/songResults");
				}
			})
			.catch(console.error);
	};

}]);
