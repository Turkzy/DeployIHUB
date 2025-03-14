const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutSchema = new Schema ({
    title: { type: String, required: true, trim: true},
    content: { type: String, required: true},
    Imgurl: { type: String, required: true}
});

module.exports = mongoose.model("About", AboutSchema);