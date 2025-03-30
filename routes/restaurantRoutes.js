const express = require("express");
const {
  allRestaurantHandler,
  createNewRestaurantHandler,
  updateRestaurantHandler,
  deleteRestaurantHandler,
  reviewHandler,
  getRestaurant,
  fetchPrivateRestaurants
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



module.exports = restaurantRoute;
