const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const server = express(); // server name
const port = 5500; // declare server port

//Models
const Item = require("./models/item"); // import the Item model

server.use(express.json());

// trigger connection to mongoDB thru mongoose
mongoose
  .connect(
    "mongodb+srv://admin:admin123@cluster0.xp0dqac.mongodb.net/?appName=Cluster0",
  )
  .then(() => {
    server.listen(port, () =>
      console.log(`Server is now running on port ${port}`),
    );
  });
let db = mongoose.connection;

db.on("error", () => console.log("Error!")); // check if connection has error
db.once("open", () => console.log("Server is now running")); // check if connection is okay

server.post("/create", async (req, res) => {
  const { name, count, isDisplayed } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Item name is required" });
  }
  const item = new Item({ name, count, isDisplayed });
  const savedItem = item.save().then((savedItem, saveError) => {
    if (saveError) {
      res.status(500).json({ error: "Failed to save item" });
    }
    res.status(201).json(savedItem);
  });
});
