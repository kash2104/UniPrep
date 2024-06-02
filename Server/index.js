const express = require("express");
const app = express();

//backend should be handled by my frontend and hence cors required
const cors = require("cors");

//importing the routes from routes folder
const userRoutes = require("./routes/User");
const examPaperRoutes = require("./routes/ExamPaper");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//database connection
database.connect();

//middlewares to be used
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
app.use(
  cors({
    //frontend request will come from port 3000
    origin: "*",
    credentials: true,
  })
);

//cloudinary connection
cloudinaryConnect();

//mounting the routes
//1. Auth controller
app.use("/api/v1/auth", userRoutes);

//2. ExamPaper controller
app.use("/api/v1/examPaper", examPaperRoutes);

//3. Course controller
app.use("/api/v1/course", courseRoutes);

//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your app is running successfully",
  });
});

//activating the server
app.listen(PORT, () => {
  console.log(`App is running successfully at port ${PORT}`);
});
