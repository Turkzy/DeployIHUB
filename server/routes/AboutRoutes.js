const express = require("express")
const { getAbout, updateAbout, createAbout, deleteAbout } = require ("../controllers/AboutController.js");

const router = express.Router();

router.post("/create-about-content", createAbout);
router.get("/abouts", getAbout);
router.put("/update-about-content/:id", updateAbout)
router.delete("/delete-about-content/:id", deleteAbout)

module.exports = router