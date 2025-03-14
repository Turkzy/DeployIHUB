const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: { type: String, required: true, trim: true},
    date: { type: String, required: true},
    Imgurl: { type: String, required: true},
    link: { type: String, required: true}
});

module.exports = mongoose.model("Events", EventSchema);