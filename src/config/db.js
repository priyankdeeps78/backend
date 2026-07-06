import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
});

const connectDB = async () => {
    try{
        await prisma.$connet();
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to the database: ", error);
        process.exit(1); // Exit the process with an error code
    }
};

const disconnectDB = async () => {
    await prisma.$disconnectDB();
}

export default {prisma, connectDB, disconnectDB};