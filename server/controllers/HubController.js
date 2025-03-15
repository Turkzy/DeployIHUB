import Hub from "../models/hubModel.js"

export const getHub = async (req, res) => {
    try {
        const hub = await Hub.find();
        res.json(hub);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createHub = async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content are required" });
    }

    try {
        const newHub = new Hub({ content });
        await newHub.save();

        res.status(201).json({ message: "The New Hub Content Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateHub = async (req, res) => {
    try {
        // Find the first hub document and update it
        const hub = await Hub.findOneAndUpdate(
            {}, // find first document
            { content: req.body.content },
            { new: true, upsert: true }
        );
        res.json(hub);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};