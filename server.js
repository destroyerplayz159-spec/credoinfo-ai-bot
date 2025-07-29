const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/ask', async (req, res) => {
  const userPrompt = req.body.prompt;
  const systemPrompt = `
You are CredoAI — a smart AI financial bot.
You explain cryptocurrencies, Indian stocks, forex, and F&O in simple terms.
Give future outlooks if asked. Be informative but easy to understand.
`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching AI response' });
  }
});

app.listen(3000, () => {
  console.log('✅ CredoAI bot server running at http://localhost:3000');
});
