"use strict";

app.controller("DashCtrl", ["$scope", "$http", function($scope, $http) {
 	$scope.metricSummary = null;
 	$scope.dashboardInfo = null;

 	$scope.getFlowLengths = () => {
 		$scope.metricSummary = "These are the three rappers with the longest flows."

 		$http.get("/api/averageLengths")
 			.then((lengthData) => {
 				$scope.dashboardInfo = lengthData.data;
 			})
 	};	

 	$scope.getFlowUniqueness = () => {
 		$scope.metricSummary = "These are the rappers with the most discrete words in their flows. This is calculated by dividing unique words by length."
 	};	

 	$scope.getFlowWeightedUniqueness = () => {
 		$scope.metricSummary = "The longer a flow gets the less unique it will get by nature due to more words like articles and prepositions being reused. This is the uniqueness value times a fudge factor determined by length."
 	};


}]);
