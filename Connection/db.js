const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "",
});

// open the MySQL connection
db.connect((error) => {
  if (error) throw error;
  console.log("DB connected");
});

module.exports = db;
