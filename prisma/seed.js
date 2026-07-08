import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const creatorId = "6274617d-33be-4ca9-89ee-80255152e577";

const movies = [
    {
        title: "The Godfather",
        overview: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
        releaseYear: 1972,
        genres: ["Drama", "Crime"],
        runtime: 175,
        posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        createdBy: creatorId,
    },
    {
        title: "The Dark Knight",
        overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        releaseYear: 2008,
        genres: ["Action", "Crime", "Drama", "Thriller"],
        runtime: 152,
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        createdBy: creatorId,
    },
    {
        title: "Pulp Fiction",
        overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        releaseYear: 1994,
        genres: ["Crime", "Thriller"],
        runtime: 154,
        posterUrl: "https://image.tmdb.org/t/p/w500/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg",
        createdBy: creatorId,
    },
    {
        title: "Forrest Gump",
        overview: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
        releaseYear: 1994,
        genres: ["Comedy", "Drama", "Romance"],
        runtime: 142,
        posterUrl: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
        createdBy: creatorId,
    },
    {
        title: "Inception",
        overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        releaseYear: 2010,
        genres: ["Action", "Science Fiction", "Adventure"],
        runtime: 148,
        posterUrl: "https://image.tmdb.org/t/p/w500/8Zf5wL9GZq15s4o3B6DlmZ8tTiw.jpg",
        createdBy: creatorId,
    },
    {
        title: "The Matrix",
        overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        releaseYear: 1999,
        genres: ["Action", "Science Fiction"],
        runtime: 136,
        posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        createdBy: creatorId,
    },
    {
        title: "Interstellar",
        overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        releaseYear: 2014,
        genres: ["Adventure", "Drama", "Science Fiction"],
        runtime: 169,
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MvrId3HX.jpg",
        createdBy: creatorId,
    },
    {
        title: "Parasite",
        overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
        releaseYear: 2019,
        genres: ["Comedy", "Thriller", "Drama"],
        runtime: 132,
        posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        createdBy: creatorId,
    },
    {
        title: "Spirited Away",
        overview: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
        releaseYear: 2001,
        genres: ["Animation", "Family", "Fantasy"],
        runtime: 125,
        posterUrl: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkPU1tfGf.jpg",
        createdBy: creatorId,
    },
    {
        title: "Avengers: Endgame",
        overview: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
        releaseYear: 2019,
        genres: ["Adventure", "Science Fiction", "Action"],
        runtime: 181,
        posterUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        createdBy: creatorId,
    }
];

const main = async () => {
    console.log("Seeding database with movies...");

    const movieTitles = movies.map((movie) => movie.title);

    await prisma.movie.deleteMany({
        where: {
            title: {
                in: movieTitles,
            },
            createdBy: creatorId,
        },
    });

    for (const movie of movies) {
        await prisma.movie.create({
            data: movie,
        });
        console.log(`Inserted movie: ${movie.title}`);
    }
    console.log("Database seeding completed.");
}

main().catch((err) =>{
    console.error("Error seeding database: ", err);
    process.exit(1); // Exit the process with an error code
}).finally(async () => {
    await prisma.$disconnect();
});
