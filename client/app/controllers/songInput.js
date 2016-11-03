"use strict";

app.controller("SongInputCtrl", ["$scope", "$http", "$route", "searchDataFactory", function($scope, $http, $route, searchDataFactory) {

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

		if(promiseArray.length === 3){
			Promise.all(promiseArray)
				.then((values) => {
					if(!values[0]) {
						$http.post("/api/newArtist", {artist: $scope.artist})
							.then((data) => {

							})
					}
					if(!values[1]) {
						$http.post("/api/newAlbum", {artist: $scope.artist, album: $scope.album})
							.then((data) => {

							})
					}
					if(!values[2]) {
						$http.post("/api/newTrack", {track: $scope.track, album: $scope.album})
							.then((data) => {
								
							})
					}

					$http.post("/api/newFlow", {flow: $scope.flowText, track: $scope.track, rapper: $scope.rapper})
						.then((data) => {
							$route.reload();
						})

				});
		}

	}

}]);
