import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { title, authorId } = req.body;
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

export default router;