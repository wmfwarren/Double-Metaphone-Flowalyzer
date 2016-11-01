"use strict";

app.controller("DashCtrl", ["$scope", "$http", function($scope, $http) {
 	$scope.metricSummary = "Click a metric for more information.";
 	$scope.dashboardInfo = null;
 	$scope.dataQuery = null;

 	$scope.getFlowLengths = () => {
 		$scope.metricSummary = "These are the three rappers with the longest flows. This is words per flow."
 		$scope.dataQuery = "length";

 		$http.get("/api/averageLengths")
 			.then((lengthData) => {
 				$scope.dashboardInfo = lengthData.data;
 			})
 	};	

 	$scope.getFlowUniqueness = () => {
 		$scope.metricSummary = "These are the rappers with the most discrete words in their flows. This is calculated by dividing unique words by the length of the flow."
 		$scope.dataQuery = "unique";

 		$http.get("/api/averageUniqueness")
 			.then((uniquenessData) => {
 				$scope.dashboardInfo = uniquenessData.data;
 			})
 	};	

 	$scope.getAvgWordLength = () => {
 		$scope.metricSummary = "A measure of the average length of words. For further data search for an artists flows!"
 		$scope.dataQuery = "wordLengths";

 		$http.get("/api/averageWordLengths")
 			.then((wordLengthData) => {
 				$scope.dashboardInfo = wordLengthData.data;
 			})
 	};


}]);
