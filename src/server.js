import express from "express";
import {config} from "dotenv";
import {connectDB, disconnectDB} from "./config/db.js";


//Importing routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";

config();
connectDB();
const app = express();

//Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//API Routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);

const PORT = 5001;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection: ", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1); // Exit the process with an error code
    })
});

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: ", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1); // Exit the process with an error code
    })
});

process.on("SIGTERM", (err) => {
    console.log("SIGTERM received: shutting down ", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1); // Exit the process with an error code
    })
});
