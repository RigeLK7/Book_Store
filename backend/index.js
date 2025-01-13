import express, { request, response } from 'express';
import {PORT, MONGODBURL} from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
//*_*_*_*_*_*_*_*_*
const app = express();
app.use(express.json());//MIDDLEWARE FOR PARSING REQUEST BODY
//*_*_*_*_*_*_*_*_*
app.use(cors());
//*_*_*_*_*_*_*_*_*
// app.use(cors({
//     origin : 'http://localhost:3000',
//     methods : ['POST', 'PUT', 'GET', 'DELETE'],
//     allowedHeaders : ['Content-type']
// }));
//MIDDLE WARE FOR HANDLING CORS POLICY
//*_*_*_*_*_*_*_*_*
app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send('Welcome to MERN stack tutorial!');
});
//*_*_*_*_*_*_*_*_*
app.use('/books', booksRoute);
//*_*_*_*_*_*_*_*_*
app.listen(PORT, ()=>{
    console.log(`App is running on port : ${PORT}`);
});
//*_*_*_*_*_*_*_*_*
mongoose.connect(MONGODBURL).then(()=>{
    console.log('App connected to database');
}).catch((err)=>{
    console.log(err);
});