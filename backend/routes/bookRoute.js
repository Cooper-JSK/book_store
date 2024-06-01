import express from 'express';
import { Book } from '../models/bookModel.js'

const router = express.Router();


//create a new book
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json(books)


    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message,
        })
    }
})

//get a specific book from database
router.get('/:id', async (req, res) => {
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

//update a book
router.put('/:id', async (req, res) => {
    try {
        //validation
        if (
            !req.body.title || !req.body.author || !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            })
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).send({
                message: "Book not found",
            })
        }

        return res.status(200).send({ message: 'Book updated succesfully' })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message,
        })

    }
})

// delete a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({
                message: "Book not found",
            })
        }
        return res.status(200).send({ message: 'Book deleted succesfully' })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message,
        })

    }
})


export default router;