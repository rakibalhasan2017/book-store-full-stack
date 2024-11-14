import express from 'express';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/', (request, response) => {
   return response.status(234).send("welcome to the project")
    
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });