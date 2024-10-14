const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const noteRoutes = require("..//routes//NoteRoutes");
app.use("/", noteRoutes);

mongoose.Promise = global.Promise;


const DB_URL =
  "mongodb+srv://Dev:Dev@666@cluster0.ztcjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
  })
  .catch((err) => {
    console.log("Could not connect to te database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Note application - Week06 Exercise</h1>");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
