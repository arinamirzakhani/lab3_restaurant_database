const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    city: String,
    cuisine: String,
    name: String,
    restaurant_id: String,
    address: Object
  },
  { collection: "Restaurants" }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
