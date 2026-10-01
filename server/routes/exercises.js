const router = require("express").Router();
const Exercise = require("../models/Exercise");

// GET /api/exercises  -> all workouts, newest first
router.get("/", async (req, res) => {
  try {
    const filter = req.query.type ? { type: req.query.type } : {};
    const exercises = await Exercise.find(filter).sort({ date: -1 });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/exercises/stats/weekly -> totals for the last 7 days
router.get("/stats/weekly", async (req, res) => {
  try {
    const since = new Date();
    since.setUTCDate(since.getUTCDate() - 6);
    since.setUTCHours(0, 0, 0, 0);

    const recent = await Exercise.find({ date: { $gte: since } });

    const byTypeMap = {};
    let totalMinutes = 0;

    recent.forEach((e) => {
      totalMinutes += e.duration;
      if (!byTypeMap[e.type]) {
        byTypeMap[e.type] = { type: e.type, sessions: 0, totalMinutes: 0 };
      }
      byTypeMap[e.type].sessions += 1;
      byTypeMap[e.type].totalMinutes += e.duration;
    });

    res.json({
      totalMinutes,
      sessions: recent.length,
      byType: Object.values(byTypeMap),
    });
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
// GET /api/exercises/:id  -> one workout
router.get("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ error: "Workout not found" });
    res.json(exercise);
  } catch (err) {
    res.status(400).json({ error: "Invalid workout id" });
  }
});

// PUT /api/exercises/:id  -> update a workout
router.put("/:id", async (req, res) => {
  try {
    const updated = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
      new: true,           // return the updated document
      runValidators: true, // apply the schema rules to updates too
    });
    if (!updated) return res.status(404).json({ error: "Workout not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/exercises/:id  -> delete a workout
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Exercise.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Workout not found" });
    res.json({ message: "Workout deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid workout id" });
  }
});
module.exports = router;