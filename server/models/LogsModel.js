const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new mongoose.Schema({
    action: { type: String, required: true },
    details: { type: String, required: true },
    user: { type: String, required: true }, 
    timestamp: { type: Date, default: Date.now } 
});

module.exports = mongoose.model("Log", logSchema);
