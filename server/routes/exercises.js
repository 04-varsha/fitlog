const router = require("express").Router();
const Exercise = require("../models/Exercise");

// GET /api/exercises  -> all workouts, newest first
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find().sort({ date: -1 });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/exercises  -> create a workout
router.post("/", async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.status(201).json(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;