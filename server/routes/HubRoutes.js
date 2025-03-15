const express = require("express");
const { getHub, updateHub, createHub } = require("../controllers/HubController.js");

const router = express.Router();

router.get("/hub", getHub);
router.post("/create-hub", createHub)
router.put("/update-hub", updateHub);

module.exports = router;