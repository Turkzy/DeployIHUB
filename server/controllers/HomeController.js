import Home from "../models/HomeModel.js"
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//FETCH THE HOME
export const getHome = async (req, res) => {
    try {
        const homes = await Home.find();
        res.json(homes);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


//C R U D

//CREATE HOME CONTENT
export const createHome = async (req, res) => {
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
                folder: "InnovationHub_Home",
                resource_type: isVideo ? "video" : "image",
                chunk_size: 6000000, // Recommended for videos
                eager_async: true
            }
        );

        const newHome = new Home({
            title,
            content,
            Imgurl: uploadResult.secure_url
        });

        await newHome.save();
        res.status(201).json({ msg: "Home Content Created Successfully" });
    } catch (error) {
        console.error("Create error:", error);
        res.status(500).json({ msg: error.message });
    }
}


// UPDATE THE HOME CONTENT
export const updateHome = async (req, res) => {
    try {
        const home = await Home.findById(req.params.id);
        if (!home) return res.status(404).json({ msg: "Home Content Not Found" });

        let newMediaUrl = home.Imgurl;

        if (req.files && req.files.Imgurl) {
            // Delete old media if it exists
            if (home.Imgurl) {
                const publicId = home.Imgurl
                    .split("/")
                    .slice(-2)
                    .join("/")
                    .split(".")[0];

                const isVideo = home.Imgurl.toLowerCase().match(/\.(mp4|mov|avi|wmv)$/);
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
                    folder: "InnovationHub_Home",
                    resource_type: isVideo ? "video" : "image",
                    chunk_size: 6000000,
                    eager_async: true
                }
            );
            
            newMediaUrl = uploadResult.secure_url;
        }

        const { title, content } = req.body;

        home.title = title || home.title;
        home.content = content || home.content;
        home.Imgurl = newMediaUrl;

        await home.save();
        res.status(200).json({ msg: "Home Content Updated Successfully" });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ msg: error.message });
    }
}
