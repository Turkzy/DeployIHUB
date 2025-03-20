const express = require("express")
const { getLogs, createLog } = require ("../controllers/LogsController.js");

const router = express.Router();


router.post("/create-logs", createLog)
router.get("/logs", getLogs);

module.exports = router
