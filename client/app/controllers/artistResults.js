"use strict";

app.controller("ArtistResultsCtrl", ["$scope", "$http", "$location", "searchDataFactory", function($scope, $http, $location, searchDataFactory) {

	$scope.artistInfo = searchDataFactory.getSearchData();

	$scope.searchTrack = (searchTerm) => {

		$http.post("/api/searchTrackFlows", {searchTerm: searchTerm})
			.then((data) => {
				searchDataFactory.setSearchData(data);
				$location.path("/songResults");
			})
			.catch(console.error);
	};

}]);
