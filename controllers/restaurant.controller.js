const { restaurantModel } = require("../models/restaurant.model");
const { userModel } = require("../models/user.model");
const mongoose=require('mongoose')

//read
async function allRestaurantHandler(req, res) {
  try {
    const restaurants = await restaurantModel.find({});
    res.json({
      success: true,
      restaurants: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurants. Please try again later.",
    });
  }
}

//add new restaurant
async function createNewRestaurantHandler(req, res) {
  try {
    const ownerId= req.user.id;
    const { name, address, city, status, imageUrl, contact, email, website} = req.body;
    const newRestaurant = await restaurantModel.create({
      name,
      address,
      city,
      status,
      imageUrl,
      owner:ownerId,
      contact,
      email,
      website
    });
    res.status(200).json({
      success: true,
      restaurant: newRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create restaurant. Please try again later.",
      error:error.message
    });
  }
}

//update restaurant
async function updateRestaurantHandler(req, res) {
  try {
    const ownerId= req.user.id;
    const {id} = req.params;
   
    const { name, address, ratings, status, imageUrl, contact, email, website} = req.body;
    if (!id) {
      return res.status(400).json({
        message: "enter valid id",
      });
    }
    const updatedRestaurant = await restaurantModel.findOneAndUpdate(
      {_id:id, owner:ownerId},
      { name, address, ratings, status, imageUrl, owner:ownerId, contact, email, website },
      { new: true }
    );
    res.status(200).json({
      success: true,
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update restaurant. Please try again later.",
    });
  }
}

//delete restaurant
async function deleteRestaurantHandler(req, res) {
  try {
    const ownerId=  req.user.id;
    const {id}  = req.params;
    if (!id) {
      return res.status(400).json({
        message: "enter valid id",
      });
    }
    const deleteRestaurant = await restaurantModel.findOneAndDelete( {_id:id, owner:ownerId});
    res.json({
      success: true,
      restaurant: deleteRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete restaurant. Please try again later.",
    });
  }
}


async function reviewHandler(req, res) {
  const userId = req.user.id; 
  const { id } = req.params; 

  try {
    const { comment, rating } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid restaurant ID.",
      });
    }

    if (!comment || !rating) {
      return res.status(400).json({
        success: false,
        message: "Both comment and rating are required.",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    const restaurant = await restaurantModel.findById(id);
    console.log("restaurant is ", restaurant);
    
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found.",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const newReview = {
      reviewerName: user.name,
      rating,
      comment,
    };

    restaurant.reviews.push(newReview);
    const updatedRestaurant = await restaurant.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully.",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    console.error("Error adding review:", error);

    res.status(500).json({
      success: false,
      message: "Failed to review the restaurant. Please try again later.",
      error: error.message, 
    });
  }
}



async function fetchPrivateRestaurants(req, res) {
  try {
    const ownerId = req.user.id; 
    const restaurants = await restaurantModel.find({ owner: ownerId });

    if (!restaurants || restaurants.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No restaurants found for this owner.",
        data: {
          restaurants: [],
        },
      });
    }

    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurants. Please try again later.",
      error,
    });
  }
}


//get restaurant by id
async function getRestaurant(req,res){
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "enter valid id",
      });
    }

    const restaurant = await restaurantModel.findById(id);
    res.json({
      success: true,
      restaurants: restaurant,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get restaurant. Please try again later.",
      error:error
    });
  }
}

module.exports = {
  allRestaurantHandler,
  createNewRestaurantHandler,
  updateRestaurantHandler,
  deleteRestaurantHandler,
  reviewHandler,
  fetchPrivateRestaurants,
  getRestaurant
};


