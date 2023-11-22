import {Router} from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  return res.json(users);
})

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return res.json(user);
});

export default router;