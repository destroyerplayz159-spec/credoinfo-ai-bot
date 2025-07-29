const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check route for Render
app.get('/', (req, res) => {
  res.send('🟢 CredoAI Bot Server is running');
});

// Main AI chat route
app.post('/ask', async (req, res) => {
  const userPrompt = req.body.prompt;
  const systemPrompt = `
You are CredoAI — a smart AI financial bot.
You explain cryptocurrencies, Indian stocks, forex, and F&O in simple terms.
Give future outlooks if asked. Be informative but easy to understand.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error('❌ Error generating response:', err);
    res.status(500).json({ error: 'Error fetching AI response' });
  }
});

// Use dynamic port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ CredoAI bot server running at http://localhost:${PORT}`);
});
