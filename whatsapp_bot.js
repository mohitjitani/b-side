import Anthropic from "@anthropic-ai/sdk";
import express from "express";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_NUMBER = "whatsapp:+14155238886"; // Sandbox number

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Simple in-memory store (swap for Supabase/Postgres later)
const users = new Map(); // phone -> { phone, joinedAt }
const conversationHistory = new Map(); // phone -> [messages]

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Generate today's music story
async function generateMusicStory() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 400,
    messages: [
      {
        role: "user",
        content: `You are a music historian texting a friend. Generate ONE true, fascinating story about something that happened on ${today} in music history — any year.

Rules:
- 2-3 sentences max. Punchy, warm, like a text from a friend
- Must be a real verified event
- Include the year and artist/band
- End with why it still matters today

Then write:

🎵 *Recommendation:* [Song Title] - [Artist] ([Year])
_[One sentence on why to listen]_
🔗 Search on Spotify: "[Song Title] [Artist]"

No intro. Start with the story directly.`,
      },
    ],
  });

  return message.content[0].type === "text" ? message.content[0].text : "";
}

// Handle follow-up conversation
async function handleConversation(phone, userMessage) {
  let history = conversationHistory.get(phone) || [];

  history.push({ role: "user", content: userMessage });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    system:
      "You are a music expert texting a friend. Keep replies short (2-3 sentences max), casual, warm, specific. If asked for recs, give 1-2 songs with a brief reason each. You know everything about music history, genres, artists, albums, and culture.",
    messages: history.slice(-6), // last 3 exchanges
  });

  const reply =
    response.content[0].type === "text" ? response.content[0].text : "";

  history.push({ role: "assistant", content: reply });
  conversationHistory.set(phone, history);

  return reply;
}

// Send WhatsApp message
async function sendWhatsApp(to, body) {
  try {
    await client.messages.create({
      from: TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${to}`,
      body,
    });
  } catch (err) {
    console.error("Twilio send error:", err.message);
  }
}

// Incoming WhatsApp webhook
app.post("/webhook", async (req, res) => {
  const from = req.body.From?.replace("whatsapp:", "");
  const body = (req.body.Body || "").trim();

  if (!from) return res.sendStatus(200);

  // Register user if new
  if (!users.has(from)) {
    users.set(from, { phone: from, joinedAt: new Date() });
    console.log(`New user: ${from}`);

    await sendWhatsApp(
      from,
      `🎵 Hey! Welcome to *Daily Music Stories*.\n\nEvery morning you'll get:\n• One true story from music history\n• One song recommendation\n\nYou can reply anytime — ask me anything about music.\n\nYour first story drops tomorrow at 8 AM. Can't wait? Reply *story* to get one now.`
    );
    return res.sendStatus(200);
  }

  // Commands
  if (body.toLowerCase() === "story") {
    const story = await generateMusicStory();
    await sendWhatsApp(from, story);
    return res.sendStatus(200);
  }

  if (body.toLowerCase() === "stop") {
    users.delete(from);
    conversationHistory.delete(from);
    await sendWhatsApp(from, "You've been unsubscribed. Sorry to see you go 👋");
    return res.sendStatus(200);
  }

  // General conversation
  const reply = await handleConversation(from, body);
  await sendWhatsApp(from, reply);

  res.sendStatus(200);
});

// Daily story trigger — call this from a cron job
app.post("/send-daily-story", async (req, res) => {
  const story = await generateMusicStory();
  let sent = 0;

  for (const [phone] of users.entries()) {
    await sendWhatsApp(phone, story);
    sent++;
    // Small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`Daily story sent to ${sent} users`);
  res.json({ success: true, sent });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", users: users.size });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎵 Music bot running on port ${PORT}`);
});
