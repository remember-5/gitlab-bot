import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import gitlab from './gitlab';
import health from './health';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/gitlab', gitlab);
router.use('/health', health);

export default router;
