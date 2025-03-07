import Team from "../models/TeamModel.js";
import path from "path";
import fs from "fs";

/* GET All Teams */
export const getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

/* GET Team By ID */
export const getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ msg: "Team member not found" });
        res.json(team);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

/* CREATE Team */
export const createTeam = async (req, res) => {
    if (!req.files || !req.files.file) return res.status(400).json({ msg: "No File Upload" });

    const { name, position } = req.body;
    const file = req.files.file;
    const fileSize = file.size;
    const ext = path.extname(file.name);
    const filename = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
    const allowType = ['.png', '.jpg', '.jpeg'];

    if (!allowType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Image Format" });
    if (fileSize > 10000000) return res.status(422).json({ msg: "Image must be less than 10MB" });

    file.mv(`./public/images/${filename}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });

        try {
            const newTeam = new Team({ name, position, image: filename, url });
            await newTeam.save();
            res.status(201).json({ msg: "Team Member Created Successfully" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    });
};

/* UPDATE Team */
export const updateTeam = async (req, res) => {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ msg: "Team Member Not Found" });

    let filename = team.image;

    if (req.files && req.files.file) {
        const file = req.files.file;
        const fileSize = file.size;
        const ext = path.extname(file.name);
        filename = file.md5 + ext;
        const allowType = ['.png', '.jpg', '.jpeg'];

        if (!allowType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Image Format" });
        if (fileSize > 10000000) return res.status(422).json({ msg: "Image must be less than 10MB" });

        const filepath = `./public/images/${team.image}`;
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        file.mv(`./public/images/${filename}`, async (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const { name, position } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${filename}`;

    try {
        team.name = name;
        team.position = position;
        team.image = filename;
        team.url = url;
        await team.save();
        res.status(200).json({ msg: "Team Member Updated Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

/* DELETE Team */
export const deleteTeam = async (req, res) => {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ msg: "Team Member Not Found" });

    try {
        const filepath = `./public/images/${team.image}`;
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        await Team.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Team Member Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
