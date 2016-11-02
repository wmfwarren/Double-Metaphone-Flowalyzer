"use strict";

app.controller("DashCtrl", ["$scope", "$http", "$location", "searchDataFactory", function($scope, $http, $location, searchDataFactory) {
 	$scope.metricSummary = "Click a metric for more information.";
 	$scope.dashboardInfo = null;
 	$scope.dataQuery = "default";


 	$scope.getFlowLengths = (() => {

 		$http.get("/api/averageLengths")
 			.then((lengthData) => {
 				$scope.dashboardInfo = lengthData.data;
 			})
 	})();	

 	$scope.getFlowLengths = () => {
 		$scope.metricSummary = "These are the three rappers with the longest flows. While length can be impressive by necessitating compliance to rhymes or metaphors for longer, some rappers favor more complex short flows."
 		$scope.dataQuery = "length";

 		$http.get("/api/averageLengths")
 			.then((lengthData) => {
 				$scope.dashboardInfo = lengthData.data;
 			})
 	};	

 	$scope.getFlowUniqueness = () => {
 		$scope.metricSummary = "These are the rappers with the most discrete words in their flows. This metric usually is lower for rappers who favor longer flows, because of the necessary reuse of words like articles, or those using poetic repetition in their flows."
 		$scope.dataQuery = "unique";

 		$http.get("/api/averageUniqueness")
 			.then((uniquenessData) => {
 				$scope.dashboardInfo = uniquenessData.data;
 			})
 	};	

 	$scope.getAvgWordLength = () => {
 		$scope.metricSummary = "A measure of the average length of words. Longer works can give rise to more complex rhyme schemes, but not always."
 		$scope.dataQuery = "wordLengths";

 		$http.get("/api/averageWordLengths")
 			.then((wordLengthData) => {
 				console.log("word", wordLengthData);
 				$scope.dashboardInfo = wordLengthData.data;
 				console.log("$scope.dashboardInfo", $scope.dashboardInfo);
 			})
 	};

 	$scope.searchArtist = (searchTerm) => {

		$http.post("/api/searchArtistFlows", {searchTerm: searchTerm})
			.then((data) => {
				searchDataFactory.setSearchData(data);
				console.log("data", data);
				$location.path("/artistResults");
			})
			.catch(console.error);
	};


}]);
