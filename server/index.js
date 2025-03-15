require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const contactRoutes = require("./routes/contactRoutes.js");
const teamRoutes = require("./routes/TeamRoutes.js");
const eventRoutes = require("./routes/EventsRoutes.js");
const aboutRoutes = require("./routes/AboutRoutes.js");
const visionRoutes = require("./routes/VisionRoutes.js");
const homeRoutes = require ("./routes/HomeRoutes.js");
const hubRoutes = require ("./routes/HubRoutes.js")
const fileUpload = require("express-fileupload");


connectDB();

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/'}));


app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/vision", visionRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/hub", hubRoutes);



const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
