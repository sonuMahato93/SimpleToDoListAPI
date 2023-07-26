const express = require("express");
const {
  createDB,
  createTable,
  allTasks,
  newTask,
  updateTask,
  deleteTask,
} = require("../Controller/todoController");
const router = express.Router();

// API

router.get("/create/database", createDB);
router.get("/create/table", createTable);
router.get("/task", allTasks);
router.post("/task", newTask);
router.patch("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

module.exports = router;
