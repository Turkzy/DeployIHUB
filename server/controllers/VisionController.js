import Vision from "../models/VisionModel.js";


//FETCH THE VISION
export const getVision = async (req, res) => {
    try {
        const visions = await Vision.find();
        res.json(visions);
    } catch (error) {
        res.status(500).json ({ message: error.message});
    }
};


//C R U D


// CREATE VISION CONTENT
export const createVision = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and Content are required" });
    }

    try {
        const newVision = new Vision({ title, content });
        await newVision.save();

        res.status(201).json({ message: "The New Vision Content Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// UPDATE THE VISION CONTENT
// UPDATE THE VISION CONTENT
export const updateVision = async (req, res) => {
    try {
        const vision = await Vision.findById(req.params.id);
        if (!vision) return res.status(404).json({ message: "Vision Content Not Found" });

        const { title, content } = req.body;

        vision.title = title || vision.title;
        vision.content = content || vision.content;
        await vision.save();

        return res.status(200).json({ message: "Vision Content Updated Successfully", vision });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// DELETE VISION CONTENTS
export const deleteVision = async (req, res) => {
    const vision = await Vision.findById(req.params.id);
    if (!vision) return res.status(404).json({ message: "Vision Content Not Found" });

    try {
        await Vision.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Vision Content Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
