import express from 'express';
import { getVerificationStatus, submitVerificationStatus } from '../controllers/verificationController.js';

const router = express.Router();

// Get current verification status
router.get('/', getVerificationStatus);

// Submit verification status update
router.post('/', submitVerificationStatus);

export default router;

