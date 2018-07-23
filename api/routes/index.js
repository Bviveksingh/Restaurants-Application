var express = require("express");
var router = express.Router();
var controller = require('../controllers/restaurants-controller.js');
var reviewController = require('../controllers/reviews-controller.js');


router
.route('/restaurants')
.get(controller.restaurantsGetAll)
.post(controller.restaurantsAddOne);

router
.route('/restaurants/:restaurantID')
.get(controller.restaurantsGetOne)
.put(controller.restaurantsUpdateOne)
.delete(controller.restaurantsDeleteOne);

router
.route('/restaurants/:restaurantID/reviews')
.get(reviewController.reviewsGetAll)
.post(reviewController.reviewsAddOne);

router
.route('/restaurants/:restaurantID/reviews/:reviewID')
.get(reviewController.reviewsGetOne)
.put(reviewController.reviewsUpdateOne)
.delete(reviewController.reviewsDeleteOne);



module.exports = router;
