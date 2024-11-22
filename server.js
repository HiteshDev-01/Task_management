import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/dbConnection.js";

dotenv.config();

// App initialize
const app = express();

// Returns middleware that only parses json data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));

// Establish the DB connection and start the server
connectDB()
  .then(() => {
    app.on("error", () => {
      console.log("Application not able to connect the DB" + error);
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("DB CONNECTION ERROR or SERVER ERROR::" + error.message);
  });

// import taskRoutes
import taskRoutes from "./routes/task.route.js";
app.use("/tasks", taskRoutes);
