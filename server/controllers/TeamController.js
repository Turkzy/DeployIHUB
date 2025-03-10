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

/* CREATE Team */
export const createTeam = async (req, res) => {
  if (!req.files || !req.files.file)
    return res.status(400).json({ msg: "No File Upload" });

  const { name, position } = req.body;
  const file = req.files.file;
  const fileSize = file.size;
  const ext = path.extname(file.name);
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Image Format" });

  if (fileSize > 10000000)
    return res.status(422).json({ msg: "Image must be less than 10MB" });

  try {
    // Move the file
    await new Promise((resolve, reject) => {
      file.mv(`./public/images/${filename}`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Save to the database
    const newTeam = new Team({ name, position, image: filename, url });
    await newTeam.save();

    res.status(201).json({ msg: "Team Member Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/* UPDATE Team */
export const updateTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ msg: "Team Member Not Found" });

    let filename = team.image; // Keep existing filename unless updated

    if (req.files && req.files.file) {
      const file = req.files.file;
      const fileSize = file.size;
      const ext = path.extname(file.name);
      filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`; // Update filename
      const allowType = [".png", ".jpg", ".jpeg"];

      if (!allowType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Image Format" });

      if (fileSize > 10000000)
        return res.status(422).json({ msg: "Image must be less than 10MB" });

      // Delete old image if it exists
      const oldFilePath = `./public/images/${team.image}`;
      if (fs.existsSync(oldFilePath)) {
        await fs.promises
          .unlink(oldFilePath)
          .catch((err) => console.error("Failed to delete old file:", err));
      }

      // Move new file
      await new Promise((resolve, reject) => {
        file.mv(`./public/images/${filename}`, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    // Update database
    const { name, position } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${filename}`;

    team.name = name || team.name;
    team.position = position || team.position;
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
      fs.promises.unlink(filepath).catch((err) => console.error(err));
    }
    await Team.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Team Member Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
