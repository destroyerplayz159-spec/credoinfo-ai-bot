import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  try {
   const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",  // ✅ change from "gpt-4" to this
  messages: [
    { role: "system", content: "You are a helpful AI financial assistant." },
    { role: "user", content: prompt }
  ]
});
    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("🔥 ERROR from OpenAI:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
