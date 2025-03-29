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

restaurantRoute.get("/:id", getRestaurant);

// restaurantRoute.get('/OwnerRestaurants',auth, ownerAuth, fetchPrivateRestaurants);

module.exports = restaurantRoute;
