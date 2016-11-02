"use strict";

app.controller("SongResultsCtrl", ["$scope", "$http", "$location", "searchDataFactory", function($scope, $http, $location, searchDataFactory) {

	$scope.songInfo = searchDataFactory.getSearchData();
	
	$scope.colors = ["#557AD1" , "#2B2249", "#FC5D5D"];

	$scope.lengths = [];
	$scope.uniqeness = [];
	$scope.flowLabels = [];
	$scope.LUdata = [];
	$scope.LUseries = ["Length", "Unique Words"];

	$scope.upperWordDev = [];
	$scope.meanWord = [];
	$scope.lowerWordDev = [];
	$scope.wordData = [];
	$scope.wordSeries = ["One StDev", "Mean", "Negative One StDev"];

	for(let i = 0; i < $scope.songInfo.data.length; i++) {
		$scope.lengths.push($scope.songInfo.data[i].l);
		$scope.uniqeness.push($scope.songInfo.data[i].u);
		$scope.flowLabels.push(`Flow ${i + 1}`);

		$scope.upperWordDev.push(parseFloat(($scope.songInfo.data[i].avg + $scope.songInfo.data[i].stdev).toFixed(2)));
		$scope.meanWord.push(parseFloat(($scope.songInfo.data[i].avg).toFixed(2)));
		$scope.lowerWordDev.push(parseFloat(($scope.songInfo.data[i].avg - $scope.songInfo.data[i].stdev).toFixed(2)));
	}

	$scope.LUdata.push($scope.lengths);
	$scope.LUdata.push($scope.uniqeness);

	$scope.wordData.push($scope.upperWordDev);
	$scope.wordData.push($scope.meanWord);
	$scope.wordData.push($scope.lowerWordDev);

}]);
