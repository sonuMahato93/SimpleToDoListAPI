const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const todos = require("./Router/todoRouter");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", todos);

const port = 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
