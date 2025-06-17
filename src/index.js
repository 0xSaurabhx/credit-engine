import express from 'express';
import bodyParser from 'body-parser';
import { validatePayload } from './utils/validator.js';
import { calculateCredits } from './services/creditCalculator.js';

const app = express();
app.use(bodyParser.json());

const creditsDB = {}; // In-memory store for demo

app.get('/', (req, res) => {
  res.json({
    message: 'Credit Engine API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      enroll: 'POST /api/enroll',
      credits: 'GET /api/credits/:userId',
      docs: "https://github.com/0xSaurabhx/credit-engine/blob/main/README.md"
    }
  });
});

app.post('/api/enroll', (req, res) => {
  const validation = validatePayload(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const { userId, actionType, referrerId, spend } = req.body;
  const credits = calculateCredits(actionType, spend);

  creditsDB[userId] = (creditsDB[userId] || 0) + credits;
  return res.json({ userId, creditsAwarded: credits, totalCredits: creditsDB[userId] });
});

app.get('/api/credits/:userId', (req, res) => {
  const userId = req.params.userId;
  const totalCredits = creditsDB[userId] || 0;
  return res.json({ userId, totalCredits });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));