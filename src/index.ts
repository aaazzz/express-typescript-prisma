import express from 'express';
import { PrismaClient } from '@prisma/client';
import userController from './controllers/userController';
import postController from './controllers/postController';

const app = express();
const port = 3001;

app.use(express.json());

const prisma = new PrismaClient();

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/users', userController);
app.use('/posts', postController);

app.listen(port, () => console.log(`Example app listening on port ${port}!!`));
