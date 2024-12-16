import express from 'express';
import { getTimeline } from '../controllers/timelineController.js';

const router = express.Router();

// Get verification timeline
router.get('/', getTimeline);

export default router;

