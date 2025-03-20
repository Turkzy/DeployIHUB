import Log from "../models/LogsModel.js";

// Corrected to be an Express route handler
export const createLog = async (req, res) => {
    const { action, details, user } = req.body;

    try {
        await Log.create({ action, details, user });
        res.status(201).json({ message: "Log created successfully" });
    } catch (error) {
        console.error("Failed to create log:", error);
        res.status(500).json({ message: "Failed to create log", error });
    }
};

export const getLogs = async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch logs", error });
    }
};
