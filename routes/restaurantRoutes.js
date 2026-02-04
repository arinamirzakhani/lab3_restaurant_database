const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

// 4) Return all restaurant details
router.get("/restaurants", async (req, res) => {
  try {
    if (!req.query.sortBy) {
      const data = await Restaurant.find({});
      return res.json(data);
    }

    // 6) Sort by restaurant_id
    const order = req.query.sortBy === "DESC" ? -1 : 1;

    const docs = await Restaurant.find(
      {},
      { cuisine: 1, name: 1, city: 1, restaurant_id: 1 }
    ).sort({ restaurant_id: order });

    const result = docs.map((r) => ({
      id: r._id,
      cuisines: r.cuisine,
      name: r.name,
      city: r.city,
      restaurant_id: r.restaurant_id
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5) Return restaurants by cuisine
router.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  try {
    const data = await Restaurant.find({ cuisine: req.params.cuisine });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7) Delicatessen not in Brooklyn
router.get("/restaurants/Delicatessen", async (req, res) => {
  try {
    const docs = await Restaurant.find(
      { cuisine: "Delicatessen", city: { $ne: "Brooklyn" } },
      { _id: 0, cuisine: 1, name: 1, city: 1 }
    ).sort({ name: 1 });

    const result = docs.map((r) => ({
      cuisines: r.cuisine,
      name: r.name,
      city: r.city
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
