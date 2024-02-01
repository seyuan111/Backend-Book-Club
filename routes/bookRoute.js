import express from 'express'
import { Book } from '../models/bookModels.js'
const router = express.Router();

router.post('/', async (req,res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.summary ||
            !req.body.ratings
        ){
            return res.status(400).send({
                message: "Please fill in the require fields: title, author, and publishYear"
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            ratings: req.body.ratings
        }

        const book = await Book.create(newBook)
        return res.status(201).send(book)

    }catch(error){
        console.log(error.message)
        res.status(500).send({ message: error.message})
    }
})

router.get("/", async (req,res) => {
    try{
        const book = await Book.find({})
        return res.status(200).json({
            count: book.length,
            data: book
        })
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

router.get("/:id", async (req,res) => {
    try{

        const { id } = req.params

        const book = await Book.findById(id)

        return res.status(200).json({
            count: book.length,
            data: book
        })
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

router.put("/:id", async (req,res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.summary ||
            !req.body.ratings
        ){
            return res.status(400).send({
                message: "Please fill in the require fields: title, author, and publishYear"
            })
        }

        const { id } = req.params

        const result = await Book.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).json({ message: "Couldnt find book"})
        }

        return res.status(200).send({ message: "Book updated successfully"})

    }catch (err){
        console.log(err.mesage)
    }
})

router.delete('/:id', async (req,res) => {
    try{

        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id)

        if(!result) {
            return res.status(400).json({ message: "Book not found"})
        }

        return res.status(200).send({ message: "Book deleted successfully"})

    }catch(err){
        console.log(err.messaage)
        res.status(500).send({ message: err.message })
    }
})

export default router