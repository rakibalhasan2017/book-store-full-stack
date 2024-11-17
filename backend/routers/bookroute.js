import express from 'express'
import { book as Book } from '../model/bookmodel.js';
const router = express.Router();


router.get('/', async(request, response) => {
    try {
      const book = await Book.find({});
      return response.status(200).json({
        count: book.length,
        data: book
      });
    }
    catch(error) {
      console.log(error.message);
      response.status(500).send({message: error.message})
      
    }
  })
  
  router.get('/:id', async(request, response) => {
    try {
      const {id} = request.params;
      
    const book = await Book.findById(id);
    return response.status(201).json({
      data: book
    })
    }
    catch(error) {
      console.log(error.message);
      return response.status(500).send({message: error.message});
    }
    
  })
  
  router.put('/:id', async(request, response) => {
    try {
      const { title, author, publishyear } = request.body;
      if(!request.body.title ||
        !request.body.author ||
        !request.body.publishyear
      ) {
        return response.status(400).send({
          message: "send all the reqired fields first"
        })
      }
      const {id} = request.params;
      const book = await Book.findByIdAndUpdate(id, {title, author, publishyear}, {new: true, runValidators: true});
  
      if (!book) {
        return response.status(404).send({ message: "Book not found" });
      }
      return response.status(200).json({
        message: "Book updated successfully",
        data: book,
      });
  
    }
    catch(error) {
      console.log(error.message);
      return response.status(500).send({message: error.message});
    }
  })
  
  router.post('/', async (request, response) => {
    try{
      if(!request.body.title ||
        !request.body.author ||
        !request.body.publishyear
      ) {
        return response.status(400).send({
          message: "send all the reqired fields first"
        })
      }
      const newbook = {
        title: request.body.title,
        author: request.body.author,
        publishyear: request.body.publishyear
      }
      const book = await Book.create(newbook);
      return response.status(201).send(book);
    }
    catch(error) {
      console.log(error.message);
      response.status(500).send({message: error.message})
      
    }
  })
  
  
  router.delete('/:id', async(request, response) => {
    try {
      const {id} = request.params;
      const book = await Book.findByIdAndDelete(id);
  
      if (!book) {
        return response.status(404).send({ message: "Book not found" });
      }
      return response.status(200).json({
        message: "Book deleted successfully",
      });
    }
    catch(error) {
      console.log(error.message);
      return response.status(500).send({message: error.message});
    }
  })

  export default router
  
  