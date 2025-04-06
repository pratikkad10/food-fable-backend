const express = require("express");
const {
  allRestaurantHandler,
  createNewRestaurantHandler,
  updateRestaurantHandler,
  deleteRestaurantHandler,
  reviewHandler,
  getRestaurant,
  fetchPrivateRestaurants,
  searchRestaurants
} = require("../controllers/restaurant.controller");
const { auth, ownerAuth, userAuth } = require("../middleware/auth");
const restaurantRoute = express.Router();

restaurantRoute.get("/restaurants", allRestaurantHandler);

restaurantRoute.post("/add", auth, ownerAuth, createNewRestaurantHandler);

restaurantRoute.put("/edit/:id", auth, ownerAuth, updateRestaurantHandler);

restaurantRoute.delete("/delete/:id", auth, ownerAuth, deleteRestaurantHandler);

restaurantRoute.post("/review/:id", auth, userAuth, reviewHandler);

restaurantRoute.get('/owner',auth, ownerAuth, fetchPrivateRestaurants);

restaurantRoute.get("/:id", getRestaurant);

restaurantRoute.get("/find/:city",auth, searchRestaurants);



module.exports = restaurantRoute;
