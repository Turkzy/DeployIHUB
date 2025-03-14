import About from "../models/AboutModel.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//FETCH THE ABOUT
export const getAbout = async (req, res) => {
    try {
        const abouts = await About.find();
        res.json(abouts);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


//C R U D

//CREATE ABOUT CONTENT
export const createAbout = async (req, res) => {
    if (!req.files || !req.files.Imgurl) 
        return res.status(400).json({ msg: "No File Upload" });
    
    const { title, content } = req.body;
    const file = req.files.Imgurl;
    
    try {
        // Check file size (50MB limit)
        if (file.size > 50 * 1024 * 1024) {
            return res.status(400).json({ msg: "File size must be less than 50MB" });
        }

        // Determine if it's a video or image
        const isVideo = file.mimetype.startsWith('video/');
        
        const uploadResult = await cloudinary.v2.uploader.upload(
            file.tempFilePath,
            {
                folder: "about_content",
                resource_type: isVideo ? "video" : "image",
                chunk_size: 6000000, // Recommended for videos
                eager_async: true
            }
        );

        const newAbout = new About({
            title,
            content,
            Imgurl: uploadResult.secure_url
        });

        await newAbout.save();
        res.status(201).json({ msg: "About Content Created Successfully" });
    } catch (error) {
        console.error("Create error:", error);
        res.status(500).json({ msg: error.message });
    }
}


// UPDATE THE ABOUT CONTENT
export const updateAbout = async (req, res) => {
    try {
        const about = await About.findById(req.params.id);
        if (!about) return res.status(404).json({ msg: "About Content Not Found" });

        let newMediaUrl = about.Imgurl;

        if (req.files && req.files.Imgurl) {
            // Delete old media if it exists
            if (about.Imgurl) {
                const publicId = about.Imgurl
                    .split("/")
                    .slice(-2)
                    .join("/")
                    .split(".")[0];

                const isVideo = about.Imgurl.toLowerCase().match(/\.(mp4|mov|avi|wmv)$/);
                try {
                    await cloudinary.v2.uploader.destroy(publicId, {
                        resource_type: isVideo ? "video" : "image"
                    });
                } catch (deleteError) {
                    console.log("Error deleting old file:", deleteError);
                }
            }

            // Upload new file
            const file = req.files.Imgurl;
            const isVideo = file.mimetype.startsWith('video/');

            // Check file size
            if (file.size > 50 * 1024 * 1024) {
                return res.status(400).json({ msg: "File size must be less than 50MB" });
            }

            const uploadResult = await cloudinary.v2.uploader.upload(
                file.tempFilePath,
                {
                    folder: "about_content",
                    resource_type: isVideo ? "video" : "image",
                    chunk_size: 6000000,
                    eager_async: true
                }
            );
            
            newMediaUrl = uploadResult.secure_url;
        }

        const { title, content } = req.body;

        about.title = title || about.title;
        about.content = content || about.content;
        about.Imgurl = newMediaUrl;

        await about.save();
        res.status(200).json({ msg: "About Content Updated Successfully" });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ msg: error.message });
    }
}

// DELETE ABOUT CONTENT
export const deleteAbout = async (req, res) => {
    try {
        const about = await About.findById(req.params.id);
        if (!about) return res.status(404).json({ msg: "About Content Not Found" });

        if (about.Imgurl) {
            const publicId = about.Imgurl
                .split("/")
                .slice(-2)
                .join("/")
                .split(".")[0];

            const isVideo = about.Imgurl.toLowerCase().match(/\.(mp4|mov|avi|wmv)$/);
            try {
                await cloudinary.v2.uploader.destroy(publicId, {
                    resource_type: isVideo ? "video" : "image"
                });
            } catch (deleteError) {
                console.log("Error deleting file:", deleteError);
            }
        }

        await About.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "About Content deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ msg: error.message });
    }
}