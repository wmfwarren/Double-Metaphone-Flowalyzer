"use strict";

app.controller("NavCtrl", ["$scope", "$http", function($scope, $http) {
	$scope.searchTerm = null;

	$scope.searchArtist = () => {

		$http.post("/api/searchArtistFlows", {searchTerm: $scope.searchTerm})
			.then((data) => {
				console.log("Data", data);
			})
			.catch(console.error);
	}

}]);
