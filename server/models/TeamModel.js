const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: { type: String, required: true, trim: true},
    position: {type: String, required: true},
    image: {type: String, required: true},
    url: {type: String, required: true}
});

module.exports = mongoose.model("Team", TeamSchema);

