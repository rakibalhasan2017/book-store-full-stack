import express from 'express';
import {mongoDBURL} from './config.js'
import mongoose from 'mongoose';
import {book as Book} from './model/bookmodel.js'

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/', (request, response) => {
   return response.status(234).send("welcome to the project")
    
})
app.post('/book', async (request, response) => {
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
  mongoose
        .connect(mongoDBURL)
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server is running on http://localhost:${PORT}`);
              });
           console.log("connected to the database")
        })
        .catch((error) => {
            console.log(error);
            
        })