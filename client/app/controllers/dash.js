"use strict";

app.controller("DashCtrl", ["$scope", "$http", function($scope, $http) {
 	$scope.metricSummary = null;
 	$scope.dashboardInfo = null;
 	$scope.dataQuery = null;

 	$scope.getFlowLengths = () => {
 		$scope.metricSummary = "These are the three rappers with the longest flows."
 		$scope.dataQuery = "length";

 		$http.get("/api/averageLengths")
 			.then((lengthData) => {
 				$scope.dashboardInfo = lengthData.data;
 			})
 	};	

 	$scope.getFlowUniqueness = () => {
 		$scope.metricSummary = "These are the rappers with the most discrete words in their flows. This is calculated by dividing unique words by length."
 		$scope.dataQuery = "unique";

 		$http.get("/api/averageUniqueness")
 			.then((uniquenessData) => {
 				$scope.dashboardInfo = uniquenessData.data;
 			})
 	};	

 	$scope.getAvgWordLength = () => {
 		$scope.metricSummary = "A measure of the average length of multi-character words."
 		$scope.dataQuery = "wordLengths";

 		$http.get("/api/averageWordLengths")
 			.then((wordLengthData) => {
 				$scope.dashboardInfo = wordLengthData.data;
 				console.log("$scope.dashboardInfo",$scope.dashboardInfo );
 			})
 	};


}]);
