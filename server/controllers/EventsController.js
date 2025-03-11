import Event from "../models/EventsModel.js";
import path from "path";
import fs from "fs";

// Get all of the Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// C R U D

// CREATE EVENTS
export const createEvent = async (req, res) => {
  if (!req.files || !req.files.file) 
    return res.status(400).json({ msg: "No File Upload" });

    const { title, date, link } = req.body
    const file = req.files.file;
    const fileSize = file.size;
    const ext = path.extname(file.name);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const url = `${req.protocol}://${req.get("host")}/EventsImages/${filename}`;
    const allowType = ['.png', '.jpg', '.jpeg'];

    if (!allowType.includes(ext.toLowerCase()))
      return res.status(422).json({msg: "Invalid Image Format"});

    if (fileSize > 10000000)
      return res.status(422).json({ msg: "Image must be less than 10MB"});

    try {
      await new Promise((resolve, reject) => {
        file.mv(`./public/EventsImages/${filename}`, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      const newEvent = new Event({ title, date, image: filename, url, link });
      await newEvent.save();

      res.status(201).json({ msg: "The New Event Created Successfully"});
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
};

// UPDATE THE EVENTS
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event Not Found" });

    let filename = event.image;

    if (req.files && req.files.file) {
      const file = req.files.file;
      const fileSize = file.size;
      const ext = path.extname(file.name);
      filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      const allowType = [".png", ".jpg", ".jpeg", ".jfif"];

      if (!allowType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Image Format" });

      if (fileSize > 10000000)
        return res.status(422).json({ msg: "Image must be less than 10MB" });

      const filepath = `./public/EventsImages/${event.image}`;
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }

      await new Promise((resolve, reject) => {
        file.mv(`./public/EventsImages/${filename}`, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    const { title, date, link } = req.body;
    const url = `${req.protocol}://${req.get("host")}/EventsImages/${filename}`;

    event.title = title || event.title;
    event.date = date || event.date;
    event.image = filename;
    event.url = url;
    event.link = link || event.link;
    await event.save();

    return res.status(200).json({ msg: "Event Updated Successfully", event });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// DELETE THE EVENTS
export const deleteEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event is Not Found"});

    try {
        const filepath = `./public/EventsImages/${event.image}`;
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Event Deleted Successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}