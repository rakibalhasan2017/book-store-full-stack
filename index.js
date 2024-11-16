import express from 'express';
import {mongoDBURL} from './config.js'
import mongoose from 'mongoose';
import {book as Book} from './model/bookmodel.js'
import bookroute from './routers/bookroute.js'

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/', (request, response) => {
   return response.status(234).send("welcome to the project")
    
})
app.use('/book',bookroute);
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