require("dotenv").config();
const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body?.message || "").trim();
    if (!message) return res.status(400).json({ error: "Please type a question." });
    if (message.length > 6000) {
      return res.status(413).json({ error: "Please keep each message under 6,000 characters." });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.json({
        reply: "Demo mode: the website is working, but AI replies are not connected yet. The owner must add an API key on the server to enable real AI answers."
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are SARTHAK AI, a friendly and safe personal study assistant. Explain school topics clearly, use simple language, and when useful explain step by step. If the user asks in Hindi or Hinglish, reply in that language. Encourage learning rather than just copying."
        },
        { role: "user", content: message }
      ],
      max_tokens: 900
    });

    res.json({ reply: response.choices?.[0]?.message?.content || "I couldn't create a reply. Please try again." });
  } catch (error) {
    console.error("Chat error:", error.message);
    res.status(500).json({ error: "AI could not reply right now. Please try again later." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`SARTHAK AI running on port ${port}`));
