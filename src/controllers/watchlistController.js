import { prisma } from "../config/db.js";

const addtoWatchlist = async (req, res) => {
  const { movieId, status, rating, notes, userId } = req.body;

  //Verify if movieId is exists in the database
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  //check if the movie is already in the user's watchlist
  const existingInWatchlist = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: userId,
        movieId: movieId,
      },
    },
  });

  if (existingInWatchlist) {
    return res
      .status(400)
      .json({ message: "Movie is already in the watchlist" });
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data: {
        userId: userId,
        movieId: movieId,
        status: status || "PLANNED",
        rating: rating || null,
        notes: notes || null,
    }
  })

  res.status(201).json({
    status: "success",
    data: {
      watchlistItem,
    },
  });
}
export { addtoWatchlist };
