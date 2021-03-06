"use strict";

const app = angular.module("flowalyzer", ["ngRoute", "chart.js"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: "DashCtrl",
      templateUrl: "/app/partials/dash.html"
    })
    .when("/songResults", {
      controller: "SongResultsCtrl",
      templateUrl: "/app/partials/songResults.html"
    })
    .when("/artistResults", {
      controller: "ArtistResultsCtrl",
      templateUrl: "/app/partials/artistResults.html"
    })
    .when("/input", {
      controller: "SongInputCtrl",
      templateUrl: "/app/partials/songInput.html"
    })
    .otherwise('/')
}]);



