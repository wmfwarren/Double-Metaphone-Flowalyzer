"use strict";

app.controller("SongInputCtrl", ["$scope", "$http", "$location", "searchDataFactory", function($scope, $http, $location, searchDataFactory) {

	$scope.flowText = "";
	$scope.track = "";
	$scope.artist = "";
	$scope.rapper = "";
	$scope.album = "";

	$scope.inputFlow = () => {
		const promiseArray = [];

		if($scope.track && $scope.artist && $scope.album && $scope.rapper) {
			promiseArray.push(
					$http.post("/api/findArtist", {artist: $scope.artist})
						.then((result) => {
							if(result.data.length > 0){
								return true;
							}

							return false;
						})
			);	

			promiseArray.push(
					$http.post("/api/findAlbum", {album: $scope.album})
						.then((result) => {
							if(result.data.length > 0){
								return true;
							}

							return false;
						})
			);	

			promiseArray.push(
					$http.post("/api/findTrack", {track: $scope.track})
						.then((result) => {
							if(result.data.length > 0){
								return true;
							}

							return false;
						})
			);
		}

		console.log("prom", promiseArray);
		if(promiseArray.length === 3){
			Promise.all(promiseArray)
				.then((values) => {
					console.log("values", values);
					if(!values[0]) {
						$http.post("/api/newArtist", {artist: $scope.artist})
							.then((data) => {
								console.log("artistExists", data );
							})
					}
					if(!values[1]) {
						$http.post("/api/newAlbum", {artist: $scope.artist, album: $scope.album})
							.then((data) => {
								console.log("albumExists", data );
							})
					}
					if(!values[2]) {
						$http.post("/api/newTrack", {track: $scope.track, album: $scope.album})
							.then((data) => {
								console.log("trackExists", data );
							})
					}

					$http.post("/api/newFlow", {flow: $scope.flowText})
						.then((data) => {
							console.log("flowExists", data );
						})

				});
		}

	}

}]);
