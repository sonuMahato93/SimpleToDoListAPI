const db = require("../Connection/db");

//CREATE DATABASE
exports.createDB = (req, res) => {
  let q = "CREATE DATABASE todolist";
  db.query(q, (err, result) => {
    if (err) throw err;
    return res.status(201).json({ msg: "Database created" });
  });
};

//CREATE TABLE
exports.createTable = (req, res) => {
  let q =
    "CREATE TABLE todolist.task(id int AUTO_INCREMENT, task_name VARCHAR(255),completed BOOLEAN DEFAULT FALSE,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id))";
  db.query(q, (err, result) => {
    if (err) throw err;
    return res.status(201).json({ msg: "TABLE CREATED" });
  });
};

// GET /tasks: Retrieve all tasks from the database and return them as JSON.
exports.allTasks = (req, res) => {
  const query = "SELECT * FROM todolist.task";
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result);
  });
};

// POST /tasks: Add a new task to the database. The request body should contain the task_name. Return the newly created task as JSON.
exports.newTask = (req, res) => {
  const { task_name } = req.body;
  const query = "INSERT INTO todolist.task (task_name) VALUES (?)";
  db.query(query, [task_name], (err, result) => {
    if (err) {
      throw err;
    }
    const newTaskId = result.insertId;
    const newTaskQuery = "SELECT * FROM todolist.task WHERE id = ?";
    db.query(newTaskQuery, [newTaskId], (err, taskResult) => {
      if (err) {
        throw err;
      }
      res.status(201).json(taskResult[0]);
    });
  });
};

// PATCH /tasks/:id: Update a task's completion status. The request body should contain the completed field. Return the updated task as JSON.
exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  const { completed } = req.body;
  if (completed === undefined) {
    return res
      .status(204)
      .json({ error: 'The "completed" field is missing in the request body.' });
  }
  const query = "UPDATE todolist.task SET completed = ? WHERE id = ?";
  db.query(query, [completed, taskId], (err, result) => {
    if (err) {
      throw err;
    }
    const updatedTaskQuery = "SELECT * FROM todolist.task WHERE id = ?";
    db.query(updatedTaskQuery, [taskId], (err, taskResult) => {
      if (err) {
        throw err;
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ msg: "Task with the specified ID not found." });
      } else {
        return res.status(200).json(taskResult[0]);
      }
    });
  });
};

// DELETE /tasks/:id: Delete a task from the database. Return a success message.
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  const query = "DELETE FROM todolist.task WHERE id = ?";
  db.query(query, [taskId], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ msg: "Task with the specified ID not found." });
    } else {
      return res.status(200).json({ message: "Task deleted successfully." });
    }
  });
};
