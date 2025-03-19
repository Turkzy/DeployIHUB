import Event from "../models/EventsModel.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  if (!req.files || !req.files.Imgurl) 
    return res.status(400).json({ message: "No Image Upload" });

  const { title, date, content, link } = req.body;
  const imageFile = req.files.Imgurl;

  try {

    const imageResult = await cloudinary.v2.uploader.upload(
      imageFile.tempFilePath || imageFile.path,
      {
        folder: "events_images",
      }
    );

    const newEvent = new Event({
      title, date, content, link, Imgurl: imageResult.secure_url,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event is Successfully Created" })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE THE EVENTS
export const updateEvent = async (req, res) => {
  try {
     const event = await Event.findById(req.params.id);
     if (!event) return res.status(404).json({ message: "Events Not Found" });

     let newImageUrl = event.Imgurl;

     if (req.files && req.files.Imgurl) {
      
      if (event.Imgurl) {
        const imagePublicId = event.Imgurl
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];
      try {
        await cloudinary.v2.uploader.destroy(imagePublicId);
      } catch (deleteError) {
        console.log ("Error deleting old image:", deleteError);
      }
      }

      const imageResult = await cloudinary.v2.uploader.upload(
        req.files.Imgurl.tempFilePath || req.files.Imgurl.path,
        { folder: "events_images" }
      );
      
      newImageUrl = imageResult.secure_url;
     }

     const { title, date, content, link } = req.body;

     event.title = title || event.title;
     event.date = date || event.date;
     event.content = content || event.content;
     event.link = link || event.link;
     event.Imgurl = newImageUrl;

     await event.save();
     res.status(200).json({ message: "Event Content Updated Successfully" });
  } catch (error) {
    console.error("Updated error:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE THE EVENTS
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event Content Not Found" });

    if (event.Imgurl) {
      const imagePublicId = event.Imgurl
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];

      try {
        await cloudinary.v2.uploader.destroy(imagePublicId);
      } catch (deleteError) {
        console.log("Error deleting image:", deleteError);
      }
    }

    await Event.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ msg: "Events files deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ msg: error.message });
  }
};
