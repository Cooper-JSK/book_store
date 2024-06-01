import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import cors from "cors"
import bookRoute from "./routes/bookRoute.js"

const app = express();

//middleware for parsing request body 
app.use(express.json());

//middleware for handling cors policy
//option 1 : allow all origins with default of cors(*) 
app.use(cors())
// option 2 : allow custom origins
// app.use(
//     cors({
//         origin: "http:localhost:5173",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Welcome to MERN stack');
});


app.use('/books', bookRoute)







const startServer = async () => {
    try {
        await mongoose.connect(mongoDBURL)
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });


    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

startServer();
