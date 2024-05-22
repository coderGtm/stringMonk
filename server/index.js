import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

const app = express();


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server listening on PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });