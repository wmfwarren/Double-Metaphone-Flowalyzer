"use strict";

app.controller("SongInputCtrl", ["$scope", "$http", "$location", "searchDataFactory", function($scope, $http, $location, searchDataFactory) {

	$scope.flowText = "";
	$scope.track = "";
	$scope.artist = "";
	$scope.rapper = "";
	$scope.album = "";

	$scope.inputFlow = () => {
		let artistExists = false;
		let albumExists = false;
		let trackExists = false;

		const promiseArray = [];

		promiseArray.push(
				$http.post("/api/findArtist", {artist: $scope.artist})
					.then((result) => {
						if(result.data.length > 0){
							return true;
						}

						return false;
					});
		);	

		promiseArray.push(
				$http.post("/api/findAlbum", {album: $scope.album})
					.then((result) => {
						if(result.data.length > 0){
							return true;
						}

						return false;
					});
		);	

		promiseArray.push(
				$http.post("/api/findTrack", {track: $scope.track})
					.then((result) => {
						if(result.data.length > 0){
							return true;
						}

						return false;
					});
		);

		console.log("prom", promiseArray);

		Promise.all(promiseArray)
			.then((values) => {
				
			});

	}

}]);
