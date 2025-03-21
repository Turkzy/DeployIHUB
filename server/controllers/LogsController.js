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

        if (logs.length > 10){
            const excessLogs = logs.slice(10);
            const excessLogIds = excessLogs.map(log => log._id);

            await Log.deleteMany({ _id: { $in: excessLogIds } });
        }
        res.status(200).json(logs.slice(0, 10));
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch logs", error });
    }
};
