import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3001;

app.use(express.json());

const prisma = new PrismaClient();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  return res.json(users);
})

app.post('/users', async (req, res) => {
  console.log(req.body);
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
      }
    });
    return res.json(user); 
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.put('/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return res.json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.delete('/users/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return res.json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.get('/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return res.json(user);
});

app.post('/posts', async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        authorId,
      },
    });
    return res.json(post);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!!`));
