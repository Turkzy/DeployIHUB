const express = require("express");
const {
  getContact,
  updateContact,
} = require("../controllers/ContactController");

const router = express.Router();

router.get("/all-contacts", getContact);
router.put("/update-contact", updateContact);

module.exports = router;
