angular.module("meanRestaurant").controller('restaurantsdisplayController', restaurantsdisplayController);

function restaurantsdisplayController($route, $routeParams,RestaurantFactory){
  var vm = this;
  var id = $routeParams.id;
  vm.isSubmitted = false;

  RestaurantFactory.restaurantsDisplay(id).then(function(response){
       vm.restaurant = response.data;
  });

  vm.addReview = function() {
   var postData = {
     name: vm.name,
     rating: vm.rating,
     review: vm.review
   };
   if (vm.reviewForm.$valid) {
     RestaurantFactory.postReview(id, postData).then(function(response) {
       if(response.status === 201){
         $route.reload();
       }
     }).catch(function(error) {
       console.log(error);
     });
   } else {
     vm.isSubmitted = true;
   }
 };



};
