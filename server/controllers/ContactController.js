const Contact = require("../models/ContactModel");

// Get Contact Info
exports.getContact = async (req, res) => {
    try {
        const contact = await Contact.find();
        res.json(contact); // Send response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Contact Info
exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

