//for restaurants data
const mongoose = require("mongoose");
const { boolean } = require("zod");
const ObjectId = mongoose.ObjectId;

const restaurant = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true,
  },
  contact:{
    type:Number,
    required:true
  },
  email:{
    type: String,
    required: true,
  },
  website:{
    type: String,
    required: true,
  },
  reviews: [
    {
      reviewerName: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  status: { 
   type: String, 
   enum: ["open", "closed"], 
   required: true 
},
  imageUrl: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

const restaurantModel = mongoose.model("restaurants", restaurant);

module.exports = { restaurantModel };
