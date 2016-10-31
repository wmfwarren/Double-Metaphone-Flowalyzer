"use strict";

app.controller("SongResultsCtrl", ["$scope", "$http", "searchDataFactory", function($scope, $http, searchDataFactory) {

	$scope.songInfo = searchDataFactory.getSearchData();

	console.log("$scope.songInfo", $scope.songInfo.data);

	//D3 Graph Work
	const BAR_HEIGHT = 25;
	const WIDTH = 400;

	 var yAxis = d3.axisLeft()
      .scale(6);

  var xAxis = d3.axisBottom()
      .scale($scope.songInfo.data.length + 1);

	const dataArray = [];

	for(let i = 0; i < $scope.songInfo.data.length; i++) {
		dataArray.push($scope.songInfo.data[i].avg);
	}

	const x = d3.scaleLinear()
		.domain([0, d3.max(dataArray)])
		.range([0, WIDTH]);

	const chart = d3.select("#flowDataGraph")
		.attr("width", WIDTH)
    .attr("height", BAR_HEIGHT * dataArray.length);

  const bar = chart.selectAll("g")
    .data(dataArray)
  	.enter()
  	.append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * BAR_HEIGHT + ")"; });

  bar.append("rect")
    .attr("width", x)
    .attr("height", BAR_HEIGHT - 1);

}]);
