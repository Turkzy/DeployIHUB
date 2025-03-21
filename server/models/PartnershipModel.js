const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartnerSchema = new Schema({
    Imgurl: {type: String, required: true},
    usertype: { type: String, required: true }
});

module.exports = mongoose.model("Partnership", PartnerSchema);