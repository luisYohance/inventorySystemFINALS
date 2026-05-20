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

server.patch("/update/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    } else {
      res.status(200).json(updatedItem);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

server.delete("/delete/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    } else {
      res.status(200).json(deletedItem);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

server.patch("/toggle-display/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    item.isDisplayed = !item.isDisplayed;
    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

server.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

server.patch("/add-count/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (typeof req.body.count !== "number") {
      return res.status(400).json({ error: "Count must be a number" });
    }
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (req.body.count < 0) {
      return res.status(400).json({ error: "Count must be a positive number" });
    }
    item.count += req.body.count != undefined ? req.body.count : 1;
    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

server.patch("/remove-count/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (typeof req.body.count !== "number") {
      return res.status(400).json({ error: "Count must be a number" });
    }
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (req.body.count < 0) {
      return res.status(400).json({ error: "Count must be a positive number" });
    }
    if (item.count < req.body.count) {
      return res.status(400).json({ error: "Not enough items in stock" });
    }

    item.count -= req.body.count != undefined ? req.body.count : 1;
    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

server.listen(port, () => console.log("Server is now running on port " + port));
