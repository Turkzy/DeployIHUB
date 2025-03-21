import Team from "../models/TeamModel.js";
import cloudinary from "cloudinary";
import axios from "axios";

// Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  if (!req.files || !req.files.Imgurl)
    return res.status(400).json({ msg: "No Image Upload" });

  const { name, position } = req.body;
  const imageFile = req.files.Imgurl;
  const pdfFile = req.files.pdf;

  try {
    // Upload image to Cloudinary
    const imageResult = await cloudinary.v2.uploader.upload(
      imageFile.tempFilePath || imageFile.path,
      {
        folder: "InnovationHub_Teams",
      }
    );

    // Upload PDF if provided
    let pdfUrl = null;
    if (pdfFile) {
      const pdfResult = await cloudinary.v2.uploader.upload(
        pdfFile.tempFilePath || pdfFile.path,
        {
          folder: "InnovationHub_Teams",
          resource_type: "raw", // Important for PDF uploads
        }
      );
      pdfUrl = pdfResult.secure_url;
    }

    const newTeam = new Team({
      name,
      position,
      Imgurl: imageResult.secure_url,
      pdfUrl: pdfUrl,
    });

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

    let newImageUrl = team.Imgurl;
    let newPdfUrl = team.pdfUrl;

    // Handle image update
    if (req.files && req.files.Imgurl) {
      // Delete old image if it exists
      if (team.Imgurl) {
        const imagePublicId =
          team.Imgurl.split("/").slice(-2)[0] +
          "/" +
          team.Imgurl.split("/").pop().split(".")[0];
        try {
          await cloudinary.v2.uploader.destroy(imagePublicId);
        } catch (deleteError) {
          console.log("Error deleting old image:", deleteError);
        }
      }

      // Upload new image
      const imageResult = await cloudinary.v2.uploader.upload(
        req.files.Imgurl.tempFilePath,
        { folder: "InnovationHub_Teams" }
      );
      newImageUrl = imageResult.secure_url;
    }

    // Handle PDF update
    if (req.files && req.files.pdf) {
      // Delete old PDF if it exists
      if (team.pdfUrl) {
        const pdfPublicId =
          team.pdfUrl.split("/").slice(-2)[0] +
          "/" +
          team.pdfUrl.split("/").pop().split(".")[0];
        try {
          await cloudinary.v2.uploader.destroy(pdfPublicId, {
            resource_type: "raw",
          });
        } catch (deleteError) {
          console.log("Error deleting old PDF:", deleteError);
        }
      }

      // Upload new PDF
      const pdfResult = await cloudinary.v2.uploader.upload(
        req.files.pdf.tempFilePath,
        {
          folder: "InnovationHub_Teams",
          resource_type: "raw",
        }
      );
      newPdfUrl = pdfResult.secure_url;
    }

    const { name, position } = req.body;

    team.name = name || team.name;
    team.position = position || team.position;
    team.Imgurl = newImageUrl;
    team.pdfUrl = newPdfUrl;

    await team.save();
    res.status(200).json({ msg: "Team Member Updated Successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ msg: error.message });
  }
};

/* DELETE Team */
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ msg: "Team Member Not Found" });

    // Delete image from Cloudinary
    if (team.Imgurl) {
      const imagePublicId =
        team.Imgurl.split("/").slice(-2)[0] +
        "/" +
        team.Imgurl.split("/").pop().split(".")[0];
      try {
        await cloudinary.v2.uploader.destroy(imagePublicId);
      } catch (deleteError) {
        console.log("Error deleting image:", deleteError);
      }
    }

    // Delete PDF from Cloudinary if it exists
    if (team.pdfUrl) {
      const pdfPublicId =
        team.pdfUrl.split("/").slice(-2)[0] +
        "/" +
        team.pdfUrl.split("/").pop().split(".")[0];
      try {
        await cloudinary.v2.uploader.destroy(pdfPublicId, {
          resource_type: "raw", // Important for PDF files
        });
      } catch (deleteError) {
        console.log("Error deleting PDF:", deleteError);
      }
    }

    // Delete the team member from database
    await Team.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ msg: "Team Member and associated files deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ msg: error.message });
  }
};

/* Download PDF */
export const downloadPdf = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team || !team.pdfUrl) {
      return res.status(404).json({ msg: "PDF not found" });
    }

    // Fetch the PDF from Cloudinary
    const response = await axios({
      url: team.pdfUrl,
      method: "GET",
      responseType: "stream",
    });

    // Set headers for file download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${team.name}-document.pdf"`
    );

    // Pipe the PDF stream to the response
    response.data.pipe(res);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ msg: "Error downloading PDF" });
  }
};
