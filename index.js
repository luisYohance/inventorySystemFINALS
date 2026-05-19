const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const server = express(); // server name
const port = 5500; // declare server port

//Models
const Item = require("./models/item.js"); // import the Item model

server.use(express.json());

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

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
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

server.listen(port, () => console.log("Server is now running on port " + port));
