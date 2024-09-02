const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 3700;

let tasks = [];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", { tasks: tasks });
});

app.post("/add", (req, res) => {
  const newTask = req.body.task;
  if (newTask) {
    tasks.push(newTask);
  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const taskIndex = req.body.index;
  tasks.splice(taskIndex, 1);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
