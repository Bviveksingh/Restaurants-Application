angular.module("meanRestaurant").controller('restaurantsController', restaurantsController);

function restaurantsController(RestaurantFactory){

  var vm = this;
  vm.title = "Top Restaurants in Hyderabad"


  RestaurantFactory.restaurantsList().then(function(response){
    vm.restaurants = response.data;
  });



};
