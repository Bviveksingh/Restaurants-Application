angular.module('meanRestaurant').factory('RestaurantFactory',RestaurantFactory)


function RestaurantFactory($http){
  return{
    restaurantsList : restaurantsList,
    restaurantsDisplay: restaurantsDisplay,
    postReview: postReview
  };



function restaurantsList(){
  return $http.get('/api/restaurants?count=6').then(complete).catch(failed);
}


function restaurantsDisplay(id){
  return $http.get('/api/restaurants/' +id).then(complete).catch(failed);
}

function postReview(id, review){
  return $http.post('/api/restaurants/' + id + '/reviews', review).then(complete).catch(failed);
}
function complete(response){
  return response;
}

function failed(error){
  console.log(error);
}
}
