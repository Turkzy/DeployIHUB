import Contact from "../models/ContactModel.js"

// Get Contact Info
export const getContact = async (req, res) => {
    try {
        const contact = await Contact.find();
        res.json(contact); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createContact= async (req, res) => {
    const { phone, email, address } = req.body;

    if (!phone || !email || !address) {
        return res.status(400).json({ message: "Phone, Email, Address are required" });
    }

    try {
        const newContact = new Contact({ phone, email, address });
        await newContact.save();

        res.status(201).json({ message: "The New Contact Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update Contact Info
export const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

