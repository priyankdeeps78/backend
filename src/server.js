import express from "express";

//Importing routes
import movieRoutes from "./routes/movieRoutes.js";

const app = express();

//API Routes
app.use("/movies", movieRoutes);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

//GET, POST, PUT, DELETE
//http://localhost:5001/auth/login
//http://localhost:5001/movies/get

// AUTH - signin, sign up
// MOVIE - GETTING ALL MOVIES
// USER - PROFILE
// WATCHLIST - ADDING MOVIES TO WATCHLIST