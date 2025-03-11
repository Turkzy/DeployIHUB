const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutSchema = new Schema ({
    title: { type: String, required: true, trim: true},
    content: { type: String, required: true},
    image: { type: String, required: true},
    url: { type: String, required: true}
});

module.exports = mongoose.model("About", AboutSchema);