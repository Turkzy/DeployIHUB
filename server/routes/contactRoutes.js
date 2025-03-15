const express = require("express");
const {
  getContact,
  updateContact, createContact
} = require("../controllers/ContactController");

const router = express.Router();

router.get("/all-contacts", getContact);
router.post("/create-contacts", createContact);
router.put("/update-contact", updateContact);

module.exports = router;
