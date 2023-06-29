const mongoose = require("mongoose");

const { Schema } = mongoose;

const chatSechema = new Schema({
  room: {
    type: objectId,
    require: true,
    ref: "Room",
  },

  user: { type: String, required: true },

  chat: String,
  gif: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = roomSechema;
