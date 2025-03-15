const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hubSchema = new Schema({
    content: { type: String, required: true }
});

module.exports = mongoose.model("Hub", hubSchema);