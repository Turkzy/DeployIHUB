import About from "../models/AboutModel.js";
import path from "path";
import fs from "fs";

//FETCH THE ABOUT
export const getAbout = async (req, res) => {
    try {
        const abouts = await About.find();
        res.json(abouts);
    } catch (error) {
        res.status(500).json ({ message: error.message});
    }
};


//C R U D

//CREATE ABOUT CONTENT
export const createAbout = async (req, res) => {
    if (!req.files || !req.files.file)
        return res.status(400).json ({ message: "No File Uploaded"});

    const { title, content } = req.body;
    const file = req.files.file;
    const fileSize = file.size;
    const ext = path.extname(file.name);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const url = `${req.protocol}://${req.get("host")}/AboutImages/${filename}`;
    const allowType = [ '.png', '.jpg', '.jpeg', '.jfif', '.mp4'];

    if (!allowType.includes(ext.toLocaleLowerCase()))
        return res.status(422).json({ message: "Invalid Image Format" });

    if (fileSize > 50000000)
        return res.status(422).json({ message: " Image and Videos must be less than 50MB try to compress.."});

    try {
        await new Promise((resolve, reject) => {
            file.mv(`./public/AboutImages/${filename}`, (error) => {
                if (error) reject (error);
                else resolve();
            });
        });

        const newAbout = new About({ title, content, image: filename, url});
        await newAbout.save();

        res.status(201).json({ message: "The New About Content Created Successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// UPDATE THE ABOUT CONTENT
export const updateAbout = async (req, res) => {
    try {
        const about = await About.findById(req.params.id);
        if (!about) return res.status(404).json({ message: "About Content Not Found" });

        let filename = about.image;

        if (req.files && req.files.file) {
            const file = req.files.file;
            const fileSize = file.size;
            const ext = path.extname(file.name);
            filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
            const allowType = [ '.png', '.jpg', '.jpeg', '.jfif', '.mp4'];

            if (!allowType.includes(ext.toLowerCase()))
                return res.status(422).json({ message: "Invalid Image or Videos Format" });

            if (fileSize > 50000000)
                return res.status(422).json({ message: "Image or Videos must be less than 50MB try to compress" });

            const filepath = `./public/AboutImages/${about.image}`;
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }

            await new Promise((resolve, reject) => {
                file.mv(`./public/AboutImages/${filename}`, (error) => {
                    if (error) reject(error);
                    else resolve()
                });
            });
        }
        const { title, content } = req.body;
        const url = `${req.protocol}://${req.get("host")}/AboutImages/${filename}`;

        about.title = title || about.title;
        about.content = content || about.content;
        about.image = filename;
        about.url = url;
        await about.save();

        return res.status(200).json({ message: "About Content Updated Succesfully" , about});
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

// DELETE ABOUT CONTENTS
export const deleteAbout = async (req, res) => {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ message: "About Content is Not Found" });

    try {
        const filepath = `./public/AboutImages/${about.image}`;
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        await About.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "About Content is Deleted Successfully" });
    } catch (error) {
        res.status (500).json({ message: error.message });
    }
}