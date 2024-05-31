import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js"

const app = express();

//middleware for parsing request body 
app.use(express.json());

app.get('/', (res) => {
    console.log(req);
    return res.status(200).send('Welcome to MERN stack');
});


app.post('/books', async (req, res) => {
    try {
        if (
            !req.body.title || !req.body.author || !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);


    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message,
        })

    }
})


//get all the books from database
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message,
        })
    }
})

//get a specific book from database
app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book)


    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message,
        })
    }
})

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
