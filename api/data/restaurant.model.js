var mongoose = require('mongoose');
var reviewSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        "default":0


    },
    review:{
        type:String,
        required:true

    }



});


var restaurantSchema = new mongoose.Schema({
        name:{
          type:String,
          required:true
        },
        stars:{
          type:Number,
          min:0,
          max:5,
        'default':0
      },
        description:String,
        cuisine:[String],
        address:String,
        hours:String,
        number:Number,
        cost:String,
        reviews:[reviewSchema],
        services:[String] });

mongoose.model('Restaurant', restaurantSchema, "restaurants");
