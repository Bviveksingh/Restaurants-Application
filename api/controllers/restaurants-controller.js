var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');



module.exports.restaurantsGetAll = function(req,res){

   // Define offset and count values.
   var offset = 0;
   var count = 5;
   var maxCount = 6;

   if(req.query && req.query.offset){
     offset = parseInt(req.query.offset,10);
   }

   if(req.query && req.query.count){
     count = parseInt(req.query.count,10);
   }

   if(isNaN(offset) || isNaN(count)){
     res.status(404).json({
       "message": "Offset and Count should be numbers"
     });
   }

   if(count > maxCount){
     res.status(404).json({
       "message": "Count value should be less than 6"
     });
   }

   Restaurant
   .find()
   .skip(offset)
   .limit(count)
   .exec(function(err,restaurants){
     if(err){
       console.log("Error finding restaurants");
       res.status(404).json({"message":"Error finding restaurants"});
     }

     else{
       console.log("Found hotels : " +restaurants.length);
     }

     res.json(restaurants);
   })



};


module.exports.restaurantsGetOne = function(req,res){

  var restaurantID = req.params.restaurantID;
  console.log("Find Id :" +restaurantID);

  Restaurant
  .findById(restaurantID)
  .exec(function(err, doc){
      var response = {
        "message": doc,
        "status": 200
      }

      if(err){
        console.log("Error finding hotels");
        response.status = 500;
        response.message = err;
      }

      if(!doc){
        console.log("Restaurant with that ID is not found");
        response.status = 404;
        response.message = {
          "message": "Error finding hotel of id: " +restaurantID
        }
      }
      else{
        res.status(response.status).json(response.message);
      }
  });

};


var _splitArray = function(input){
    var output;
    if(input && input.length > 0){
        output= input.split(";");
    }
    else{
        output = [];
    }
    return output;
}


module.exports.restaurantsAddOne = function(req,res){
    Restaurant
    .create({
     name: req.body.name,
      stars: parseInt(req.body.stars,10),
       description: req.body.description,
      hours : req.body.hours,
      cost: req.body.cost,
      number: req.body.number,
      cuisine: _splitArray(req.body.cuisine),
      services: _splitArray(req.body.services),
      address:  req.body.address

    },function(err, doc){
      if(err){
        console.log("Error Creating Restaurant");
        res.status(400).json(err);
      }

      else{
        console.log("restaurant created!" + doc)
        res.status(201).json(doc)
      }
    })
};

module.exports.restaurantsUpdateOne = function(req,res){
  var restaurantID = req.params.restaurantID;
  console.log("Find Id :" +restaurantID);

  Restaurant
  .findById(restaurantID)
  .select("-reviews")
  .exec(function(err, doc){
      var response = {
        "message": doc,
        "status": 200
      }

      if(err){
        console.log("Error finding hotels");
        response.status = 500;
        response.message = err;
      }

      if(!doc){
        console.log("Restaurant with that ID is not found");
        response.status = 404;
        response.message = {
          "message": "Error finding hotel of id: " +restaurantID
        }
      }

      if(response.status!== 200){
          res.status(response.status).json(response.message);

      }
      else{
        doc.name = req.body.name;
        doc.stars =  req.body.stars;
         doc.description = req.body.description;
        doc.hours = req.body.hours;
        doc.cost = req.body.cost;
        doc.number = req.body.number;
        doc.cuisine = _splitArray(req.body.cuisine);
        doc.services = _splitArray(req.body.services);
        doc.address =  req.body.address;
      }

      doc.save(function(err, docUpdated){
        if(err){
          res.status(500).json(err);

        }
        else{
          res.status(204).json();

        }
      });


  });


};


module.exports.restaurantsDeleteOne = function(req,res){

  var restaurantID = req.params.restaurantID;

  Restaurant
  .findByIdAndRemove(restaurantID)
  .exec(function(err,restaurant){
    if(err){
      res.status(404).json(err);
    }
    else{
      console.log("Restaurant deleted of id:", restaurantID );
      res.status(204).json();
    }
  })

};
