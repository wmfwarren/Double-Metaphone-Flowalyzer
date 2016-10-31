"use strict";

const app = angular.module("flowalyzer", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: "DashCtrl",
      templateUrl: "/app/partials/dash.html"
    })
}]);



