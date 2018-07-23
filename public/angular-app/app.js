angular.module("meanRestaurant",['ngRoute'])
.config(config);

function config($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl:'angular-app/restaurants-list/restaurants.html',
    controller: restaurantsController,
    controllerAs:'vm'
})
  .when('/restaurants/:id',{
    templateUrl:'angular-app/restaurants-display/restaurantsdisplay.html',
    controller: restaurantsdisplayController,
    controllerAs:'vm'
  });



}
