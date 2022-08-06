const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/weatherDB", { useNewUrlParser: true });
const api = require("./server/routes/api");
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", api);

const port = 8080;
app.listen(port, function () {
  console.log(`Server running on ${port}`);
});
