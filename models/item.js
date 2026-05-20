const mongoose = require("mongoose"); // import mongoose

// define the Item schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  price: {
    type: Number,
    default: 1,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  categories: {
    type: [String],
    default: ["General"],
  },
  count: {
    type: Number,
    default: 1,
  },
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

// create the Item model
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
