import Home from "../models/HomeModel.js";
import path from "path";
import fs from "fs";

//FETCH THE HOME
export const getHome = async (req, res) => {
    try {
        const homes = await Home.find();
        res.json(homes);
    } catch (error) {
        res.status(500).json ({ message: error.message});
    }
};


//C R U D

//CREATE HOME CONTENT
export const createHome = async (req, res) => {
    if (!req.files || !req.files.file)
        return res.status(400).json ({ message: "No File Uploaded"});

    const { title, content } = req.body;
    const file = req.files.file;
    const fileSize = file.size;
    const ext = path.extname(file.name);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const url = `${req.protocol}://${req.get("host")}/HomeImages/${filename}`;
    const allowType = [ '.png', '.jpg', '.jpeg', '.jfif', '.mp4'];

    if (!allowType.includes(ext.toLocaleLowerCase()))
        return res.status(422).json({ message: "Invalid Image Format" });

    if (fileSize > 50000000)
        return res.status(422).json({ message: " Image and Videos must be less than 50MB try to compress.."});

    try {
        await new Promise((resolve, reject) => {
            file.mv(`./public/HomeImages/${filename}`, (error) => {
                if (error) reject (error);
                else resolve();
            });
        });

        const newHome = new Home({ title, content, image: filename, url});
        await newHome.save();

        res.status(201).json({ message: "The New Home Content Created Successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// UPDATE THE HOME CONTENT
export const updateHome = async (req, res) => {
    try {
        const home = await Home.findById(req.params.id);
        if (!home) return res.status(404).json({ message: "Home Content Not Found" });

        let filename = home.image;

        if (req.files && req.files.file) {
            const file = req.files.file;
            const fileSize = file.size;
            const ext = path.extname(file.name);
            filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
            const allowType = [ '.png', '.jpg', '.jpeg', '.jfif', '.mp4'];

            if (!allowType.includes(ext.toLocaleLowerCase()))
                return res.status(422).json({ message: "Invalid Image or Videos Format" });

            if (fileSize > 50000000)
                return res.status(422).json({ message: "Image or Videos must be less than 50MB try to compress" });

            const filepath = `./public/HomeImages/${home.image}`;
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }

            await new Promise((resolve, reject) => {
                file.mv(`./public/HomeImages/${filename}`, (error) => {
                    if (error) reject(error);
                    else resolve()
                });
            });
        }
        const { title, content } = req.body;
        const url = `${req.protocol}://${req.get("host")}/HomeImages/${filename}`;

        home.title = title || home.title;
        home.content = content || home.content;
        home.image = filename;
        home.url = url;
        await home.save();

        return res.status(200).json({ message: "Home Content Updated Succesfully" , home});
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

// DELETE HOME CONTENTS
export const deleteHome = async (req, res) => {
    const home = await Home.findById(req.params.id);
    if (!home) return res.status(404).json({ message: "Home Content is Not Found" });

    try {
        const filepath = `./public/HomeImages/${home.image}`;
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        await Home.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Home Content is Deleted Successfully" });
    } catch (error) {
        res.status (500).json({ message: error.message });
    }
}