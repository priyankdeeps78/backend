import express from "express";
import {addtoWatchlist} from "../controllers/watchlistController.js";

const router = express.Router();

router.post("/", addtoWatchlist);



export default router;