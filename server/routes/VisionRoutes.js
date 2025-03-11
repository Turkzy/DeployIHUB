const express = require("express")
const { createVision, getVision, updateVision, deleteVision } = require ("../controllers/VisionController.js");

const router = express.Router();

router.post("/create-vision-content", createVision);
router.get("/visions", getVision);
router.put("/update-vision-content/:id", updateVision)
router.delete("/delete-vision-content/:id", deleteVision)

module.exports = router