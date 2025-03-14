const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: { type: String, required: true, trim: true},
    position: {type: String, required: true},
    Imgurl: {type: String, required: true},
    pdfUrl: {type: String}
});

module.exports = mongoose.model("Team", TeamSchema);

