const express = require("express");
const router = express.Router();

const Restaurant = require("../models/Restaurant");

/**
 * GET all restaurants OR sorted selected columns
 * /restaurants
 * /restaurants?sortBy=ASC
 * /restaurants?sortBy=DESC
 */
router.get("/", async (req, res) => {
  try {
    const { sortBy } = req.query;

   
    if (!sortBy) {
      const restaurants = await Restaurant.find({});
      return res.json(restaurants);
    }

    
    const sortOrder = String(sortBy).toUpperCase() === "DESC" ? -1 : 1;

    const rows = await Restaurant.find(
      {},
      { cuisine: 1, name: 1, city: 1, restaurant_id: 1 }
    )
      .sort({ restaurant_id: sortOrder })
      .lean();

    const result = rows.map((r) => ({
      id: r._id,
      cuisines: r.cuisine,
      name: r.name,
      city: r.city,
      restaurant_id: r.restaurant_id
    }));

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * GET by cuisine (ALL columns)
 * /restaurants/cuisine/Japanese
 */
router.get("/cuisine/:cuisine", async (req, res) => {
  try {
    const { cuisine } = req.params;
    const restaurants = await Restaurant.find({ cuisine });
    return res.json(restaurants);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * Delicatessen AND city != Brooklyn
 * Selected columns, exclude id, sort by name ASC
 * /restaurants/Delicatessen
 */
router.get("/Delicatessen", async (req, res) => {
  try {
    const rows = await Restaurant.find(
      { cuisine: "Delicatessen", city: { $ne: "Brooklyn" } },
      { cuisine: 1, name: 1, city: 1 }
    )
      .sort({ name: 1 })
      .lean();

    const result = rows.map((r) => ({
      cuisines: r.cuisine,
      name: r.name,
      city: r.city
    }));

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
