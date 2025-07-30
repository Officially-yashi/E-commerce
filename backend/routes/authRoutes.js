
import express from 'express';
import { signup, login } from '../controllers/authController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default router;
