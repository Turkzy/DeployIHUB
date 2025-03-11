const express = require("express")
const { createHome, getHome, updateHome, deleteHome } = require("../controllers/HomeController.js");

const router = express.Router();

router.post("/create-home-content", createHome);
router.get("/homes", getHome);
router.put("/update-home-content/:id", updateHome)
router.delete("/delete-home-content/:id", deleteHome)

module.exports = router