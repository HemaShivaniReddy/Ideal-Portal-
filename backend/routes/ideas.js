import express from 'express';
import Idea from '../models/Idea.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Create idea
router.post('/', auth, async (req, res) => {
  try {
    const { title, problem, existingSolution, proposedSolution, impact } = req.body;
    if (!title || !problem || !existingSolution || !proposedSolution || !impact)
      return res.status(400).json({ message: 'All fields are required' });
    const idea = await Idea.create({
      title, problem, existingSolution, proposedSolution, impact, createdBy: req.user.id
    });
    res.status(201).json(idea);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all ideas
router.get('/', auth, async (_req, res) => {
  try {
    const ideas = await Idea.find().populate('createdBy','name email').sort({ createdAt: -1 });
    res.json(ideas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
