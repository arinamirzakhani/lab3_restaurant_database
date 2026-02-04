const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

/**
 * 4) GET all restaurants
 * Select ALL columns
 * http://localhost:3000/restaurants
 */
router.get("/", async (req, res) => {
  try {
    const { sortBy } = req.query;

    
    if (sortBy) {
      const sortOrder = sortBy === "DESC" ? -1 : 1;

      const restaurants = await Restaurant.find(
        {},
        {
          _id: 0,
          id: "$_id",
          cuisines: "$cuisine",
          name: 1,
          city: 1,
          restaurant_id: 1
        }
      ).sort({ restaurant_id: sortOrder });

      return res.json(restaurants);
    }

    
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 5) GET restaurants by cuisine
 * Select ALL columns
 * http://localhost:3000/restaurants/cuisine/:cuisine
 */
router.get("/cuisine/:cuisine", async (req, res) => {
  try {
    const cuisine = req.params.cuisine;
    const restaurants = await Restaurant.find({ cuisine });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 7) GET Delicatessen (NOT Brooklyn)
 * Include cuisines, name, city
 * Exclude id
 * Sort by name ASC
 * http://localhost:3000/restaurants/Delicatessen
 */
router.get("/Delicatessen", async (req, res) => {
  try {
    const restaurants = await Restaurant.find(
      {
        cuisine: "Delicatessen",
        city: { $ne: "Brooklyn" }
      },
      {
        _id: 0,
        cuisines: "$cuisine",
        name: 1,
        city: 1
      }
    ).sort({ name: 1 });

    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
