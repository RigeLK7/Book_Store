import express from 'express';
const router = express.Router();
import { Book } from '../models/bookModel.js';

//ADD A NEW BOOK
router.post('/', async (request, response)=>{
    try {
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({messsage : 'Send all required fields : book, author and publishYear!'});
        }
        const newBook = {
            title : request.body.title, author : request.body.author, publishYear : request.body.publishYear,
        }
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({message : error.message});
    }  
});
//GET ALL BOOKS
router.get('/',async (request, response)=>{
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count : books.length,
            data : books
        });
    } catch (err) {
        console.log({message : err.message});
        response.status(500).send({message : err.message});
        return;
    }
});
//GET SPECIFIED BOOK
router.get('/:id',async (request, response)=>{
    try {

        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (err) {
        console.log({message : err.message});
        response.status(500).send({message : err.message});
        return;
    }
});
//UPDATE A BOOK
router.put('/:id', async (request, response)=>{
    try {
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({messsage : 'Send all required fields : book, author and publishYear!'});
        }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body, {new : true});
        if(!result) return response.status(404).send("Book not found :(");
        return response.status(200).send({message : "Book updated successfully :)"});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({message : "Book not found :("});
    }
});
//DELETE A BOOK
router.delete('/:id', async (request, response)=>{
    try {
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result) return response.status(404).send("Book not found :(");
        return response.status(200).send({message : "Book deleted successfully :)"});
    } catch (err) {
        console.log("Error");
        return response.status(500).send("Error deleting the book!");
    }
});

export default router;