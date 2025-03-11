const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisionSchema = new Schema ({
    title: { type: String, required: true, trim: true},
    content: { type: String, required: true}
});

module.exports = mongoose.model("Vision", VisionSchema)