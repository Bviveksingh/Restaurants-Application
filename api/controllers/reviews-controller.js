var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');


module.exports.reviewsGetAll = function(req,res){

  var restaurantID = req.params.restaurantID;
  console.log("Find Id :" +restaurantID);

    Restaurant
    .findById(restaurantID)
    .select('reviews')
    .exec(function(err, hotel){
      console.log("Replied doc:" + hotel);
      var response = {
        "message": [],
        "status": 200
      }

      if(err){
        console.log("Error finding hotels");
        response.status = 500;
        response.message = err;
      }

      if(!hotel){
        console.log("Restaurant with that ID is not found");
        response.status = 404;
        response.message = {
          "message": "Error finding hotel of id: " +restaurantID
        }
      }
      else{
        response.message = hotel.reviews ? hotel.reviews : [];
      }

        res.status(response.status).json(response.message);

    });
};




module.exports.reviewsGetOne = function(req,res){

  var restaurantID = req.params.restaurantID;
  var reviewID = req.params.reviewID;
  console.log("Find reviewId :" +reviewID + " Of restaurantId" + restaurantID);

    Restaurant
    .findById(restaurantID)
    .select('reviews')
    .exec(function(err, hotel){
      console.log("Replied doc:" + hotel);
      var response = {
        message: {},
        status: 200
      };

      if(err){
        console.log("Error finding hotels");
        response.status = 500;
        response.message = err;
      }

      else if(!hotel){
        console.log("Restaurant with that ID is not found");
        response.status = 404;
        response.message = {
          "message": "Error finding hotel of id: " + restaurantID
        };
      }
      else{
        response.message = hotel.reviews.id(reviewID);
        if(!response.message){
        response.status= 404,
            response.message={
            "message": "Review of reviewID : " + reviewID +" not found"
        };
    }
  }
        res
        .status(response.status)
        .json(response.message);

    });

};


var _addReview = function(req,res,restaurant){
      restaurant.reviews.push({
        name : req.body.name,
        rating: parseInt(req.body.rating,10),
        review: req.body.review
      });

      restaurant.save(function(err, restaurantUpdated){
        if(err){
          res.status(500).json(err);
        }
        else{
          res.status(201).json(restaurantUpdated.reviews[restaurantUpdated.reviews.length - 1]);
        }
      });


};


module.exports.reviewsAddOne = function(req,res){
  var restaurantID = req.params.restaurantID;
  console.log("Find Id :" +restaurantID);

    Restaurant
    .findById(restaurantID)
    .select('reviews')
    .exec(function(err, hotel){
      console.log("Replied doc:" + hotel);
      var response = {
        "message": [],
        "status": 200
      }

      if(err){
        console.log("Error finding hotels");
        response.status = 500;
        response.message = err;
      }

      if(!hotel){
        console.log("Restaurant with that ID is not found");
        response.status = 404;
        response.message = {
          "message": "Error finding hotel of id: " +restaurantID
        }
      }

      if(hotel){
        _addReview(req,res,hotel);
      }
      else{
        res.status(response.status).json(response.message);
      }



    });


};


module.exports.reviewsUpdateOne = function(req,res){
  var restaurantID = req.params.restaurantID;
  var reviewID = req.params.reviewID;
  console.log("Put reviewId of " +reviewID +" in restaurantId of " +restaurantID);

  Restaurant
  .findById(restaurantID)
  .select('reviews')
  .exec(function(err, restaurant){
    var thisReview;
    var response = {
      status : 200,
      message : {}

    };

    if(err){
      console.log("Error finding the restaurant");
      response.status = 500;
      response.message = err;
    }
    else if(!restaurant){
      console.log("Restaurant id is not found in database : ",restaurantID);
      response.status = 404;
      response.message = {
        "message" : "Restaurant ID not found " +restaurantID
      };
    }
    else{
      thisReview = restaurant.reviews.id(reviewID);

      if(!thisReview){
        response.status = 404;
        response.message = {
          "message": "Review ID is not found " +reviewID
        };
      }
    }

    if(response.status !== 200){
      res.status(response.status).json(response.message);
    }
    else{
      thisReview.name = req.body.name;
      thisReview.rating = req.body.rating;
      thisReview.review = req.body.review;

      restaurant.save(function(err, restaurantUpdated){
        if(err){
          res.status(500).json(err);
        }
        else{
          res.status(204).json();
        }
      });
    }

  });



};



module.exports.reviewsDeleteOne = function (req,res){
  var restaurantID = req.params.restaurantID;
  var reviewID = req.params.reviewID;
  console.log("Put reviewId of " +reviewID +" in restaurantId of " +restaurantID);

  Restaurant
  .findById(restaurantID)
  .select('reviews')
  .exec(function(err, restaurant){
    var thisReview;
    var response = {
      status : 200,
      message : {}

    };

    if(err){
      console.log("Error finding the restaurant");
      response.status = 500;
      response.message = err;
    }
    else if(!restaurant){
      console.log("Restaurant id is not found in database : ",restaurantID);
      response.status = 404;
      response.message = {
        "message" : "Restaurant ID not found " +restaurantID
      };
    }
    else{
      thisReview = restaurant.reviews.id(reviewID);

      if(!thisReview){
        response.status = 404;
        response.message = {
          "message": "Review ID is not found " +reviewID
        };
      }
    }

    if(response.status !== 200){
      res.status(response.status).json(response.message);
    }
    else{
      restaurant.reviews.id(reviewID).remove();

      restaurant.save(function(err, restaurantUpdated){
        if(err){
          res.status(500).json(err);
        }
        else{
          res.status(204).json();
        }
      });
    }

  });

};
